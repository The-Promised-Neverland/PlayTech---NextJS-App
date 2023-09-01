import React from 'react'
import COD from '@/components/gateways/COD'

export const metadata={
  title: "Cash on Delivery",
  icons: {
    icon: "/gateways/cod.ico"
  }
}

const CashOnDelivery = () => {
  return (
    <COD />
  )
}

export default CashOnDelivery
