import PaymentSelector from '@/components/PaymentSelector'
import React from 'react'


export const metadata = {
  title: "Payments",
  icons: {
    icon: "/payment.ico"
  }
}

const Payment = () => {
  return (
    <PaymentSelector />
  )
}

export default Payment
