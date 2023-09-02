import React from "react";
import ShowOrderDetailComponent from "@/components/ShowOrderDetails";

const getOrderDetails = async (orderID) => {
  const data = await fetch(
    `https://ecommerce-api-l494.onrender.com/api/orders/${orderID}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const order = await data.json();
  console.log(order);
  return order;
};

const OrderDetail = async ({ params }) => {
  const { orderID } = params;
  const order = await getOrderDetails(orderID);
  return <ShowOrderDetailComponent order={order} />;
};

export default OrderDetail;
