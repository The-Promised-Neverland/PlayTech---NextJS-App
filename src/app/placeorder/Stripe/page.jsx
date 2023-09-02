import StripeTemplate from "@/components/gateways/Stripe";
import React from "react";


export const metadata = {
  title: "Stripe",
  icons: {
    icon: "/gateways/paypal.ico",
  },
};


const Stripe = () => {
  return <StripeTemplate />;
};

export default Stripe;
