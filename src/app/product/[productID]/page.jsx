import React from "react";
import Rating from "@/components/Rating";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  ListGroupItem,
} from "@/components/ReactBootStrap";
import Link from "next/link";
import ShowReviews from "@/components/ShowReviews";
import ReviewInput from "@/components/ReviewInput";
import AddToCart from "@/components/AddToCart";

const fetchProductDetail = async (productID) => {
  const data = await fetch(
    `https://techverse-dtq7.onrender.com/api/products/${productID}`,
    {
      next: { revalidate: 10 },
    }
  );
  const res = await data.json();
  return res;
};

const ProductScreen = async ({ params }) => {
  const productID = params.productID;

  const productData = await fetchProductDetail(productID);

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

                <AddToCart
                  countInStock={productData.countInStock}
                  product={productData}
                />
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row className="review">
          <Col md={6}>
            <h2>Reviews</h2>
            <ListGroup variant="flush">
              <ShowReviews productID={productID}  />

              <ReviewInput productId={productID} />
            </ListGroup>
          </Col>
        </Row>
      </>
    </>
  );
};

export default ProductScreen;
