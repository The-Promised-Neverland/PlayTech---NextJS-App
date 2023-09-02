import React from "react";
import ShowOrderDetailComponent from "@/components/ShowOrderDetails";

export async function generateMetadata({ params }) {
  const { orderID } = params;
  return {
    title: `${orderID}`,
    icons: {
      icon: "/orderDetails.ico",
    },
  };
}

const OrderDetail = async ({ params }) => {
  const { orderID } = params;
  return <ShowOrderDetailComponent orderID={orderID} />;
};

export default OrderDetail;
