// import React from "react";
// import { Row, Col } from "react-bootstrap";
// import Product from "@/components/Product";
// import { productsApi } from "@/RTK/API/productsApi";
// import Paginate from "@/components/Paginate";
// import store from "@/RTK/store/store";
// import TopProductCarousel from "@/components/TopProductCarousel";

// const Home = ({ products, pages, page, topProducts }) => {

//   return (
//     <>
//       <TopProductCarousel topProducts={topProducts} />
//       <h1 style={{ display: "flex", justifyContent: "center" }}>
//         Latest Products
//       </h1>
//       <Row>
//         {products.map((product) => {
//           return (
//             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//               <Product product={product} />
//             </Col>
//           );
//         })}
//       </Row>
//       <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
//     </>
//   );
// };

// export async function getServerSideProps(context) {
//   const { pageNumber, keyword } = context.query;

//   try {
//     // Use RTK Query's API object to fetch data
//     const Products = await store.dispatch(
//       productsApi.endpoints.getProducts.initiate({
//         keyword,
//         pageNumber,
//       })
//     );

//     const TopProducts = await store.dispatch(
//       productsApi.endpoints.getTopProducts.initiate()
//     );
//     // Assuming the response data structure matches what you expect
//     const products = Products.data.products;
//     const pages = Products.data.pages;
//     const page = Products.data.page;
//     const topProducts = TopProducts.data;

//     return {
//       props: {
//         products: products,
//         pages: pages,
//         page: page,
//         topProducts: topProducts,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         products: [],
//         pages: 0,
//         page: 0,
//         error: error.message || "An error occurred",
//       },
//     };
//   }
// }

// export default Home;















import React from 'react'

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
