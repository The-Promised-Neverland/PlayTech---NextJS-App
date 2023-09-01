"use client";

import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Spinner,
  ListGroupItem,
} from "../ReactBootStrap";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const loadPayPalScript = async ({ paypal, paypalDispatch }) => {
  paypalDispatch({
    type: "resetOptions",
    value: {
      "client-id": paypal.clientId,
      currency: "USD",
    },
  });
  paypalDispatch({ type: "setLoadingStatus", value: "pending" });
};

const placeOrder = async ({ cart, details }) => {
  const data = await fetch("https://techverse-dtq7.onrender.com/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      orderItems: cart?.cartItems, //array
      shippingAddress: cart?.shippingAddress,
      paymentMethod: cart?.paymentMethod,
      itemsPrice: cart?.itemsPrice,
      shippingPrice: cart?.shippingPrice,
      taxPrice: cart?.taxPrice,
      totalPrice: cart?.totalPrice,
      paymentDetails: details,
    }),
  });

  const order = await data.json();
  return order;
};

const PayPalScripter = () => {
  const router = useRouter();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { userInfo } = useSelector((state) => state.auth);

  const cart = useSelector((state) => state.cart);

  const injectPaypalScript = async () => {
    const data = await fetch(
      "https://techverse-dtq7.onrender.com/api/config/paypal",
      {
        credentials: "include",
      }
    );
    const paypal = await data.json();
    if (!window.paypal) {
      loadPayPalScript(paypal, paypalDispatch);
    }
  };

  useEffect(() => {
    if (!cart || cart?.cartItems.length === 0 || !userInfo) {
      router.replace("/");
    }
  }, [cart, userInfo]);

  useEffect(() => {
    injectPaypalScript();
  }, []);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await placeOrder({ cart, details });
        router.replace("/success");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: cart?.totalPrice,
            },
          },
        ],
      })
      .then((order) => {
        return order; // Return the order ID here
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
                {cart?.shippingAddress?.address}, {cart?.shippingAddress?.city}{" "}
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
              {cart?.cartItems?.map((item, index) => (
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
                {isPending ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Spinner animation="border" />
                    <span>Loading PayPal...</span>
                  </div>
                ) : (
                  <ListGroupItem style={{ width: "100%", paddingBottom: "0" }}>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
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

const PaypalTemplate = () => {
  return (
    <PayPalScriptProvider>
      <PayPalScripter />
    </PayPalScriptProvider>
  );
};
export default PaypalTemplate;
