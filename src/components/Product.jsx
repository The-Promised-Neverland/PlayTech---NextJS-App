"use client";

import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import Link from "next/link";

const Product = ({ product }) => {
  return (
    <Link href={`/product/${product._id}`} style={{ textDecoration: "none" }}>
      <Card className="my-3 p-3 rounded text-center mx-auto">
        <Card.Img src={product.image} variant="top" />
        <Card.Body>
          <Card.Title as="div" className="product-title">
            <strong style={{ fontSize: "1.2rem" }}>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>

          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Product;
