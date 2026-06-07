export type PaymentProvider = 'stripe' | 'local'
export interface PaymentConfig {
  provider: PaymentProvider
  currency: string
}
export const defaultPaymentConfig: PaymentConfig = {
  provider: 'stripe',
  currency: 'PYG',
}
