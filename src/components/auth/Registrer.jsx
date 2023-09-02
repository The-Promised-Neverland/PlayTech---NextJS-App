"use client";

import { useState } from "react";
import { Form, Button, Row, Col, Spinner } from "../ReactBootStrap";
import FormContainer from "../FormContainer";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentialsLocal } from "@/RTK/slices/auth";

const registerUser = async ({ name, email, password }) => {
  const data = await fetch(
    "https://ecommerce-api-l494.onrender.com/api/users",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }
  );
  return await data.json();
};

const Registrer = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/"; // Use router.query.redirect

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      try {
        const userInfo = await registerUser({ name, email, password });
        dispatch(setCredentialsLocal({ ...userInfo }));
        router.replace(redirect)
      } catch (error) {
        toast.error("Server issue..Kindly try again");
      }
    }
  };

  const isLoading = false;

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>

          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          {isLoading === true && (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{ marginRight: "1rem" }}
            />
          )}
          Sign Up
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link
            href={redirect ? `/login?redirect=${redirect}` : "/login"}
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
            replace
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default Registrer;
