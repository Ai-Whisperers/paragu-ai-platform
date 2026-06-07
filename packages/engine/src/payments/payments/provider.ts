import { PaymentConfig } from './index'
let config = { ...require('./index').defaultPaymentConfig }
export const paymentConfig = () => config as PaymentConfig
export const setPaymentConfig = (next: PaymentConfig) => { config = next }
