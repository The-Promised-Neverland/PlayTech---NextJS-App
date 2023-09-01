"use client";

import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import { useState } from "react";
import { saveShippingAddrress } from "@/RTK/slices/cart";
import { useRouter } from "next/navigation";
import FormContainer from "./FormContainer";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "./ReactBootStrap";

const Shippings = () => {
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddrress({ address, city, postalCode, country }));
    router.push("/payment");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping Screen</h1>

      <Form onSubmit={submitHandler}>
        <FormGroup controlId="address" className="my-2">
          <FormLabel>Address</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(f) => setAddress(f.target.value)}
            required
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="city" className="my-2">
          <FormLabel>City</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(f) => setCity(f.target.value)}
            required
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="postalCode" className="my-2">
          <FormLabel>Postal Code</FormLabel>
          <FormControl
            type="number"
            placeholder="Enter postalCode"
            value={postalCode}
            onChange={(f) => setPostalCode(f.target.value)}
            required
          />
        </FormGroup>
        <FormGroup controlId="country" className="my-2">
          <FormLabel>Country</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(f) => setCountry(f.target.value)}
            required
            inputMode="numeric"
          ></FormControl>
        </FormGroup>

        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shippings;
