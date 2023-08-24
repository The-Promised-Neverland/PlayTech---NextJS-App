export const revalidate = 0;

import React from "react";
import { Row, Col } from "@/components/ReactBootStrap";
import Product from "@/components/Product";
import { productsApi } from "@/RTK/API/productsApi";
import Paginate from "@/components/Paginate";
import store from "@/RTK/store/store";
import TopProductCarousel from "@/components/TopProductCarousel";

const HomeScreen = async () => {
  const Products = await store.dispatch(
    productsApi.endpoints.getProducts.initiate(
      {
        keyword: "",
        pageNumber: 0,
      },
      { forceRefetch: true }
    )
  );

  const products = Products.data.products;
  const pages = Products.data.pages;
  const page = Products.data.page;

  return (
    <>
      <TopProductCarousel />
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Latest Products
      </h1>
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
