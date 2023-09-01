import React from 'react'
import PaypalTemplate from '@/components/gateways/Paypal'

export const metadata = {
  title: "Paypal",
  icons: {
    icon: "/gateways/paypal.ico",
  },
};

const PayPal = () => {
  return <PaypalTemplate />
}

export default PayPal
