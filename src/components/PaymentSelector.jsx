"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Form,
  Button,
  Col,
  FormCheck,
  FormGroup,
  FormLabel,
} from "./ReactBootStrap";
import FormContainer from "./FormContainer";
import CheckoutSteps from "./CheckoutSteps";
import { savePaymentMethod } from "@/RTK/slices/cart";
import { useRouter } from "next/navigation";

const PaymentSelector = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    const formattedPaymentMethod = paymentMethod
      .toLowerCase()
      .replace(/\s+/g, "-"); // removes spaces and inserts -
    router.push(`/placeorder/${formattedPaymentMethod}`);
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel as="legend">Select payment gateway</FormLabel>
          <Col>
            <FormCheck
              type="radio"
              className="my-2"
              label="PayPal"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              defaultChecked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
          <Col>
            <FormCheck
              type="radio"
              className="my-2"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              defaultChecked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
          <Col>
            <FormCheck
              type="radio"
              className="my-2"
              label="Cash on Delivery"
              id="Cash on Delivery"
              name="paymentMethod"
              value="Cash on Delivery"
              defaultChecked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </FormGroup>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentSelector;
