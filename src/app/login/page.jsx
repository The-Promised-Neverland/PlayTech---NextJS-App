"use client";

import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner } from "@/components/ReactBootStrap";
import FormContainer from "@/components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { setCredentialsLocal } from "@/RTK/slices/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const login = async (email, password) => {
  const data = await fetch(
    "https://techverse-dtq7.onrender.com/api/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",  // stores the cookies sent from browser
      body: JSON.stringify({ email, password }),
    }
  );
  const res = await data.json();
  return res;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const router = useRouter(); // Initialize useRouter
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/"; // Use router.query.redirect

  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [userInfo, redirect, router]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoggingIn(true);
      const res = await login(email, password);
      console.log(userInfo, {...res})
      dispatch(setCredentialsLocal({ ...res }));
      router.push(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    } finally {
      setLoggingIn(false);
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
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
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={loggingIn === true}
        >
          {loggingIn === true && (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{ marginRight: "1rem" }}
            />
          )}
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?
          <Link
            href={redirect ? `/register?redirect=${redirect}` : "/"}
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
            replace
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default Login;
