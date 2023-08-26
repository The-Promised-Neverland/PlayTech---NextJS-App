import Link from "next/link";
import Message from "./Message";
import { Col, Table, Button } from "./ReactBootStrap";
import { FaTimes } from "react-icons/fa";

const fetchUserOrders = async () => {
  const data = await fetch(
    "https://techverse-dtq7.onrender.com/api/orders/myOrders",
    {
      credentials: "include",
    }
  );
  const orders = await data.json();
  return orders;
};

const ShowOrders = async ({ userInfo }) => {
  if (!userInfo) {
    return <Message>Unknown Error Occured...Please Login</Message>;
  }

  if (userInfo.isAdmin === true) {
    return (
      <Col md={9}>
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Admin Chat Section
        </h2>
      </Col>
    );
  }

  const orders = await fetchUserOrders();

  return (
    <>
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
                  <Link
                    href={`/orderDetails/${order._id}`}
                    style={{ color: "ghostwhite", textDecoration: "none" }}
                  >
                    <Button className="btn-sm" variant="dark">
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </>
  );
};

export default ShowOrders;
