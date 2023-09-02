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
    `https://ecommerce-api-l494.onrender.com/api/products/${productID}`,
    {
      next: { revalidate: 10 },
    }
  );
  const res = await data.json();
  return res;
};


export async function generateMetadata({ params }) {
  const productID = params.productID;

  const productData = await fetchProductDetail(productID);

  const title = productData.countInStock === 0
    ? `${productData.name} - Out of Stock`
    : `${productData.name} - $${productData.price}`;

  return {
    title,
    description: productData.description,
    generator: "Next.js 13",
    applicationName: "PlayTech",
    keywords: [
      "Next.js",
      "React",
      "JavaScript",
      "PlayTech",
      "e-commerce",
      "personal-project",
      "paypal",
      "stripe",
      "appleProducts",
      "apple",
      "electronics",
      "gadgets",
      "topProducts",
      "play-hard-play-tech",
      productData.name,
      `rating-${productData.rating}`,
      `reviews-${productData.numReviews}`
    ],
    authors: [
      {
        name: "Abhijit Roy (RainX)",
        url: [
          "https://github.com/The-Promised-Neverland",
          "https://leetcode.com/Decode_Apocalypse/",
          "https://auth.geeksforgeeks.org/user/rainx",
          "https://pastebin.com/u/RainX_69",
        ],
      },
    ],
    creator: "Abhijit Roy (RainX)",
    icons: {
      icon: "/playtech.ico",
    },

  };
}

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
