"use client"

import { Col, Table, Button } from "./ReactBootStrap";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const fetchUserOrders = async () => {
  const data = await fetch(
    "https://ecommerce-api-l494.onrender.com/api/orders/myOrders",
    {
      credentials: "include",
    }
  );
  const orders = await data.json();
  return orders;
};

const ShowOrders = () => {
  const router=useRouter();

  const [orders, setOrders] = useState([]);

   useEffect(() => {
    const getOrders = async () => {
      const fetchedOrders = await fetchUserOrders();
      setOrders(fetchedOrders);
    };
    getOrders();
  }, []);


  return (
    <Col md={9}>
      <h2 style={{ display: "flex", justifyContent: "center" }}>My Orders</h2>
      <Table striped hover responsive className="table-sm">
        <thead>
          <tr>
            <th>
              <div style={{ display: "flex", justifyContent: "center" }}>
                ORDER_ID
              </div>
            </th>
            <th>
              <div style={{ display: "flex", justifyContent: "center" }}>
                DATE
              </div>
            </th>
            <th>
              <div style={{ display: "flex", justifyContent: "center" }}>
                TOTAL
              </div>
            </th>
            <th>
              <div style={{ display: "flex", justifyContent: "center" }}>
                PAID
              </div>
            </th>
            <th>
              <div style={{ display: "flex", justifyContent: "center" }}>
                DELIVERED
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "6px",
                  }}
                >
                  {order._id}
                </div>
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "6px",
                  }}
                >
                  {order.createdAt.substring(0, 10)}
                </div>
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "6px",
                  }}
                >
                  ${order.totalPrice}
                </div>
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "6px",
                  }}
                >
                  {order.isPaid === true ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </div>
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "6px",
                  }}
                >
                  {order.isDelivered === true ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </div>
              </td>
              <td>
                <Button
                  className="btn-sm"
                  variant="dark"
                  onClick={() => router.push(`/orderDetails/${order._id}`)}
                >
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
};

export default ShowOrders;
