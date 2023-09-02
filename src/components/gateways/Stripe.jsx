"use client";

import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Spinner,
  ListGroupItem,
} from "../ReactBootStrap";
import Message from "../Message";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

const generateStripeSession = async ({ cart, userInfo }) => {
  const data = await fetch(
    "https://ecommerce-api-l494.onrender.com/api/create-checkout-session/stripe",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderItems: cart.cartItems,
        itemsPrice: cart.itemsPrice,
        userID: userInfo._id,
        shippingAddress: cart.shippingAddress,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
      }),
    }
  );
  const session = await data.json();
  return session;
};

const StripeTemplate = () => {
  const router = useRouter();

  const [stripeError, setStripeError] = useState(null);
  const [stripeLoading, setStripeLoading] = useState(true);
  const [sessionURL, setSessionURL] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart || cart.cartItems.length === 0 || !userInfo) {
      router.replace("/");
    }
  }, [cart, userInfo]);

  useEffect(() => {
    const loadStripeSession = async () => {
      try {
        const session = await generateStripeSession({
          cart,
          userInfo,
        });
        setSessionURL(session.url);
        console.log(sessionURL)            
        setStripeLoading(false);
      } catch (error) {
        setStripeError(true);
        toast.error("Stripe is down");
      }
    };

    loadStripeSession();
  }, []);


  const stripeHandler = () => {
    router.replace(sessionURL);
  }

  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Order Details
      </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <p>
                <strong>Name: </strong> {userInfo?.name}
              </p>
              <p>
                <strong>Email: </strong> {userInfo?.email}
              </p>
              <p>
                <strong>Address: </strong>
                {cart?.shippingAddress?.address}, {cart.shippingAddress?.city}{" "}
                {cart?.shippingAddress?.postalCode},{" "}
                {cart?.shippingAddress?.country}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Gateway</h2>
              <p>
                <strong>Payment Platform: </strong>
                {cart?.paymentMethod}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {cart?.cartItems.map((item, index) => (
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
              <h2 style={{ display: "flex", justifyContent: "center" }}>
                Order Summary
              </h2>
              <ListGroupItem>
                <Row>
                  <Col>MRP</Col>
                  <Col>${cart?.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>${cart?.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax Price</Col>
                  <Col>${cart?.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <strong>Final Price</strong>
                  </Col>
                  <Col>${cart?.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem
                style={{ display: "flex", justifyContent: "center" }}
              >
                {stripeLoading === false ? (
                  <>
                    {stripeError ? (
                      <Message variant="danger">Reload the page</Message>
                    ) : (
                      <Button
                        style={{ padding: "0", border: "none" }}
                        onClick={stripeHandler}
                      >
                        <Image
                          src="https://user-images.githubusercontent.com/157270/38515749-f53f8392-3be9-11e8-8917-61ef78dd354a.png"
                          alt="Stripe"
                          style={{ height: "4.2rem" }}
                        />
                      </Button>
                    )}
                  </>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Spinner animation="border" />
                    <span>Loading Stripe...</span>
                  </div>
                )}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default StripeTemplate;
