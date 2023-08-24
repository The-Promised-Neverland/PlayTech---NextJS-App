export const revalidate = 0;

import React from "react";
import Rating from "@/components/Rating";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "@/components/ReactBootStrap";
import Link from "next/link";
import store from "@/RTK/store/store";
import { productsApi } from "@/RTK/API/productsApi";
import ShowReviews from "@/components/ShowReviews";
import ReviewInput from "@/components/ReviewInput";
import Message from "@/components/Message";
import QtySelector from "@/components/QtySelector";

const ProductScreen = async ({ params }) => {
  const productID = params.productID;

  const userInfo = store.getState();
  

  console.log({userInfo})

  const { data: productData } = await store.dispatch(
    productsApi.endpoints.getProductsDetails.initiate(productID, {
      forceRefetch: true,
    })
  );

  const addToCartHandler = () => {};

  return (
    <>
      <div>
        <Link
          className="btn btn-dark my-3"
          style={{ color: "whitesmoke" }}
          href="/"
        >
          Go Back
        </Link>
      </div>

      <>
        <Row style={{ alignItems: "center", columnGap: "5rem" }}>
          <Col md={3}>
            <Image src={productData.image} alt={productData.name} fluid />
          </Col>

          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{productData.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={productData.rating}
                  text={`${productData.numReviews} reviews`}
                />
              </ListGroupItem>
              <ListGroupItem>Price: ${productData.price}</ListGroupItem>
              <ListGroupItem>{productData.description}</ListGroupItem>
            </ListGroup>
          </Col>

          <Col md={3} style={{ marginTop: "3rem" }}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${productData.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Stock:</Col>
                    <Col>
                      <strong>
                        {productData.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                {productData.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col style={{ alignItems: "center", display: "flex" }}>
                        Qty
                      </Col>
                      <Col>
                        <QtySelector countInStock={productData.countInStock} />
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
                {userInfo && userInfo.isAdmin === false && (
                  <ListGroupItem
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {productData.countInStock > 0 ? (
                      <Button
                        className="btn-block"
                        type="button"
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <span>
                        <strong>It's dry out here!</strong>
                      </span>
                    )}
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row className="review">
          <Col md={6}>
            <h2>Reviews</h2>
            {productData.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant="flush">
              <ShowReviews reviews={productData.reviews} />

              <ReviewInput productId={productID} />
            </ListGroup>
          </Col>
        </Row>
      </>
    </>
  );
};

export default ProductScreen;
