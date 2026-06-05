import Stripe from "stripe"

export interface PaymentIntentResult {
  ok: true
  clientSecret: string
  paymentIntentId: string
}

export interface PaymentIntentError {
  ok: false
  error: string
}

export interface RefundResult {
  ok: boolean
  refundId?: string
  message?: string
}

export abstract class PaymentProvider {
  abstract readonly name: string
  abstract doCreatePaymentIntent(
    amount: number,
    currency: string,
    metadata?: Record<string, string>
  ): Promise<PaymentIntentResult | PaymentIntentError>
  abstract doRefund(paymentIntentId: string, amount?: number): Promise<RefundResult>
  abstract verifyWebhook(rawBody: string, signature: string): Promise<unknown>
}

export class StripePaymentProvider extends PaymentProvider {
  readonly name = "stripe"
  private stripe: Stripe | null = null

  private getStripe(): Stripe {
    if (!this.stripe) {
      const secretKey = process.env.STRIPE_SECRET_KEY
      if (!secretKey) throw new Error("STRIPE_SECRET_KEY is not configured")
      this.stripe = new Stripe(secretKey)
    }
    return this.stripe
  }

  async doCreatePaymentIntent(
    amount: number,
    currency: string,
    metadata?: Record<string, string>
  ): Promise<PaymentIntentResult | PaymentIntentError> {
    try {
      const stripe = this.getStripe()
      const intent = await stripe.paymentIntents.create({
        amount,
        currency,
        metadata,
        automatic_payment_methods: { enabled: true },
      })
      if (!intent.client_secret) return { ok: false, error: "no client_secret returned" }
      return { ok: true, clientSecret: intent.client_secret, paymentIntentId: intent.id }
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : "payment_intent_failed" }
    }
  }

  async doRefund(paymentIntentId: string, amount?: number): Promise<RefundResult> {
    try {
      const stripe = this.getStripe()
      const params: Stripe.RefundCreateParams = { payment_intent: paymentIntentId }
      if (amount !== undefined) params.amount = amount
      const refund = await stripe.refunds.create(params)
      return { ok: true, refundId: refund.id }
    } catch (err) {
      return { ok: false, message: err instanceof Error ? err.message : "refund_failed" }
    }
  }

  async verifyWebhook(rawBody: string, signature: string): Promise<unknown> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET is not configured")
    const stripe = this.getStripe()
    return stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  }
}

const registry = new Map<string, PaymentProvider>()

export function registerProvider(provider: PaymentProvider): void {
  registry.set(provider.name, provider)
}

export function getProvider(name = "stripe"): PaymentProvider | undefined {
  return registry.get(name)
}

if (process.env.STRIPE_SECRET_KEY) {
  registerProvider(new StripePaymentProvider())
}
