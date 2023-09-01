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

export async function generateMetadata() {
  const { products } = await fetchAllProducts();
  const productNames = products.map((product) => product.name);
  return {
    title: "PlayTech-Technology at Play",
    description:
      "Explore the world of cutting-edge technology with PlayTech, an e-commerce platform built using Next.js and React. Dive into a vast array of electronics, gadgets, and top-of-the-line products. Play hard, Play Tech",
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
      ...productNames,
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
