"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Button,
} from "./ReactBootStrap";
import { toast } from "react-toastify";
import { setCredentialsLocal } from "@/RTK/slices/auth";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updating, setUpdating] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        setUpdating(true);
        const res = await fetch(
          "https://ecommerce-api-l494.onrender.com/api/users/profile",
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          }
        );
        const userInfo=await res.json();
        dispatch(setCredentialsLocal(userInfo));
        toast.success("Profile Updated Successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      } finally {
        setUpdating(false);
      }
    }
  };

  return (
    <Col md={3}>
      <h2>User Profile</h2>

      <Form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <FormGroup controlId="name" className="my-2">
          <FormLabel>Name</FormLabel>
          <FormControl
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="email" className="my-2">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password" className="my-2">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="confirm Password" className="my-2">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary" className="my-2">
          {updating && (
            <updating
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{ marginRight: "1rem" }}
            />
          )}
          Update
        </Button>
      </Form>
    </Col>
  );
};

export default UpdateUser;
