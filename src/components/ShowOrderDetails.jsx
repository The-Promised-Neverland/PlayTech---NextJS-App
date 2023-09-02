"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Image,
} from "./ReactBootStrap";
import { useSelector } from "react-redux";
import Link from "next/link";
import Message from "./Message";

// const getOrderDetails = async ({ orderID, setOrder }) => {
//   const data = await fetch(
//     `https://ecommerce-api-l494.onrender.com/api/orders/${orderID}`,
//     {
//       credentials: "include",
//     }
//   );
//   const order = await data.json();
//   setOrder(order);
//   return order;
// };

const ShowOrderDetailComponent = ({ order}) => {
  const { userInfo } = useSelector((state) => state.auth);


  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Order Detail
      </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <p>
                <strong>Name: </strong> {order?.user?.name}
              </p>
              <p>
                <strong>Email: </strong> {order?.user?.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order?.shippingAddress?.address},{" "}
                {order?.shippingAddress?.city}{" "}
                {order?.shippingAddress?.postalCode},{" "}
                {order?.shippingAddress?.country}
              </p>
              <p>
                <strong>OrderID: </strong>
                {order?._id}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">
                  Delivered on {order?.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Gateway</h2>
              <p>
                <strong>Payment Platform: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order?.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Item</h2>
              {order?.orderItems?.length === 0 && (
                <span>Please contact admin</span>
              )}
              {order?.orderItems?.map((item, index) => (
                <ListGroupItem key={index} style={{ border: "0px" }}>
                  <Row>
                    <Col
                      md={2}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Link
                        href={`/product/${item.product}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Link>
                    </Col>
                    <Col style={{ display: "flex", alignItems: "center" }}>
                      {item.name}
                    </Col>
                    <Col
                      md={4}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem
                style={{
                  backgroundColor: "ghostwhite",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h2 style={{ display: "flex", justifyContent: "center" }}>
                  Order Summary
                </h2>
                <ListGroupItem>
                  <Row>
                    <Col>MRP</Col>
                    <Col>${order?.itemsPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Shipping Price</Col>
                    <Col>${order?.shippingPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Tax Price</Col>
                    <Col>${order?.taxPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      <strong>Final Price</strong>
                    </Col>
                    <Col>${order?.totalPrice}</Col>
                  </Row>
                </ListGroupItem>

                {userInfo &&
                  userInfo.isAdmin === true &&
                  order?.isPaid === true &&
                  order?.isDelivered === false && (
                    <ListGroupItem
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverOrderHandler}
                      >
                        {loadingDeliver === true && (
                          <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                        Mark as Delivered
                      </Button>
                    </ListGroupItem>
                  )}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ShowOrderDetailComponent;
