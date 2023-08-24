import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "@/components/ReactBootStrap";
import Rating from "./Rating";
import Link from "next/link";

const Product = ({ product }) => {
  return (
    <Link href={`/product/${product._id}`} style={{ textDecoration: "none" }}>
      <Card className="my-3 p-3 rounded text-center mx-auto">
        <CardImg src={product.image} variant="top" />
        <CardBody>
          <CardTitle as="div" className="product-title">
            <strong style={{ fontSize: "1.2rem" }}>{product.name}</strong>
          </CardTitle>
          <CardText as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </CardText>

          <CardText as="h3">${product.price}</CardText>
        </CardBody>
      </Card>
    </Link>
  );
};

export default Product;
