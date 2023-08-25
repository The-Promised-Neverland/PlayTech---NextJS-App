import React from "react";
import { Row, Col } from "@/components/ReactBootStrap";
import Product from "@/components/Product";
import Paginate from "@/components/Paginate";
import TopProductCarousel from "@/components/TopProductCarousel";

const fetchAllProducts = async (pageNumber, keyword="") => {
  const url = `https://techverse-dtq7.onrender.com/api/products?keyword=${encodeURIComponent(
    keyword
  )}&pageNumber=${pageNumber}`;
  const data = await fetch(url);
  const res=await data.json();
  return res;
};

const HomeScreen = async ({params}) => {
  const pageNumber=params.pageNumber;
  const { products, pages, page } = await fetchAllProducts(pageNumber);
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
