import React from "react";
import { Row, Col } from "@/components/ReactBootStrap";
import Product from "@/components/Product";
import Paginate from "@/components/Paginate";
import TopProductCarousel from "@/components/TopProductCarousel";

const fetchAllProducts = async () => {
  const data = await fetch("https://techverse-dtq7.onrender.com/api/products", {
    next: { revalidate: 3 },
  });
  const res = await data.json();
  return res;
};

const HomeScreen = async () => {
  const { products, pages, page } = await fetchAllProducts();
  return (
    <>
      <TopProductCarousel />
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Latest Products
      </h1>
      {products.length === 0 && <strong>No Products</strong>}
      <Row>
        {products?.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
      <Paginate pages={pages} page={page} keyword={""} />
    </>
  );
};

export default HomeScreen;
