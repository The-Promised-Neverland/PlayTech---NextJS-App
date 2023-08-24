"use client";

import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner } from "@/components/ReactBootStrap";
import FormContainer from "@/components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/RTK/API/usersApi";
import { setCredentialsLocal } from "@/RTK/redux/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const router = useRouter(); // Initialize useRouter
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/"; // Use router.query.redirect

  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentialsLocal({ ...res }));
      router.push(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
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
