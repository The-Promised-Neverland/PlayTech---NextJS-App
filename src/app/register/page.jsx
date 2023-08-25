// "use client";

// import { useState } from "react";
// import { Form, Button, Row, Col, Spinner } from "@/components/ReactBootStrap";
// import FormContainer from "@/components/FormContainer";
// import { toast } from "react-toastify";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";

// const RegisterScreen = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const searchParams = useSearchParams();
//   const redirect = searchParams.get("redirect") || "/"; // Use router.query.redirect

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       toast.error("Passwords don't match");
//       return;
//     } else {
//       try {
//       } catch (error) {}
//     }
//   };

//   const isLoading = false;

//   return (
//     <FormContainer>
//       <h1>Sign Up</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId="name" className="my-3">
//           <Form.Label>Name</Form.Label>

//           <Form.Control
//             type="text"
//             placeholder="Enter Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group controlId="email" className="my-3">
//           <Form.Label>Email Address</Form.Label>

//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="password" className="my-3">
//           <Form.Label>Enter Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group controlId="confirmPassword" className="my-3">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Confirm password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Button
//           type="submit"
//           variant="primary"
//           className="mt-2"
//           disabled={isLoading}
//         >
//           {isLoading === true && (
//             <Spinner
//               as="span"
//               animation="grow"
//               size="sm"
//               role="status"
//               aria-hidden="true"
//               style={{ marginRight: "1rem" }}
//             />
//           )}
//           Sign Up
//         </Button>

//         {isLoading && <Loader />}
//       </Form>

//       <Row className="py-3">
//         <Col>
//           Already have an account?{" "}
//           <Link
//             href={redirect ? `/login?redirect=${redirect}` : "/login"}
//             style={{
//               textDecoration: "none",
//               fontWeight: "bold",
//               marginLeft: "5px",
//             }}
//             replace
//           >
//             Login
//           </Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   );
// };
// export default RegisterScreen;


import React from 'react'

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
