"use client";


// we are using javascript here and hence have to render it on client side

import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center">
            <strong>Techverse &copy; {currentYear}</strong>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
