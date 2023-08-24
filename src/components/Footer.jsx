"use client";

import React from "react";
import { Container, Row, Col } from "./ReactBootStrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col
            className="text-center"
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <strong>Powered by</strong>
            <img
              src="/footer_logo.png"
              alt="Footer Logo"
              style={{ width: "70px", height: "auto" }} // Adjust the width as needed
            />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
