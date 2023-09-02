"use client";

import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "../ReactBootStrap";
import CheckoutSteps from "@/components/CheckoutSteps";
import { toast } from "react-toastify";
import Message from "@/components/Message";
import { useRouter } from "next/navigation";
import Link from "next/link";

const placeOrder = async (cart) => {
  const data = await fetch(
    "https://ecommerce-api-l494.onrender.com/api/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        orderItems: cart.cartItems, //array
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }),
    }
  );

  const order = await data.json();
  return order;
};

const COD = () => {
  const router = useRouter();
  const cart = useSelector((state) => state.cart);

  const placeOrderHandler = async () => {
    try {
      const order = await placeOrder(cart);
      router.replace(`/success?orderID=${order._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={2}>
                          <Link
                            href={`/product/${item.product}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
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
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
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
                    <Col>Items:</Col>
                    <Col>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Shipping Price:</Col>
                    <Col>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Tax Price:</Col>
                    <Col>${cart.taxPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      <strong>Total Price:</strong>
                    </Col>
                    <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                  style={{ marginTop: "1rem" }}
                >
                  Place Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default COD;
