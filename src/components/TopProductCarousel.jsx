"use client"

import { Carousel, Image } from "react-bootstrap";
import Link from "next/link";

const TopProductCarousel = ({ topProducts }) => {
  return (
    // You were missing this return statement
    <Carousel pause="hover" className="bg-primary mb-4">
      {topProducts?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link href={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              className="carousel-image"
              fluid
            />
            <Carousel.Caption
              className="carousel-caption"
              style={{ left: 0, bottom: 0 }}
            >
              <h4 className="text-white text-right" style={{ margin: 0 }}>
                {product.name} (${product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TopProductCarousel;
