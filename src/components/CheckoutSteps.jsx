"use client";

import Link from "next/link";
import { Nav, NavItem } from "./ReactBootStrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <NavItem>
        {step1 ? (
          <Nav.Link as={Link} href="/login">
            <strong>Sign In</strong>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </NavItem>
      <NavItem>
        {step2 ? (
          <Nav.Link as={Link} href="/shipping">
            <strong>Shipping</strong>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </NavItem>
      <NavItem>
        {step3 ? (
          <Nav.Link as={Link} href="/payment">
            <strong>Payment</strong>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </NavItem>
      <NavItem>
        {step4 ? (
          <Nav.Link as={Link} href="/placeorder">
            <strong>Place Order</strong>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </NavItem>
    </Nav>
  );
};

export default CheckoutSteps;
