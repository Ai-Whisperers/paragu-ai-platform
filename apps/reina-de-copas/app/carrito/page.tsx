'use client'

import { useState } from 'react'
import CartSummary from '@/components/CartSummary'

interface CustomerInfo {
  name: string
  phone: string
  address: string
  notes: string
}

export default function CarritoPage() {
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    notes: '',
  })

  const handleCustomerChange = (field: keyof CustomerInfo, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <h1 style={{ marginBottom: 32 }}>Carrito de Compras</h1>
      <CartSummary
        customer={customer}
        onCustomerChange={handleCustomerChange}
      />
    </div>
  )
}