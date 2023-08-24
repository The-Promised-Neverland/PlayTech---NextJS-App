export const revalidate = 0;

import { productsApi } from "@/RTK/API/productsApi";
import store from "@/RTK/store/store";
import {
  Carousel,
  Image,
  CarouselItem,
  CarouselCaption,
} from "@/components/ReactBootStrap";
import Link from "next/link";

const TopProductCarousel = async () => {
  const TopProducts = await store.dispatch(
    productsApi.endpoints.getTopProducts.initiate(null,{forceRefetch: true})
  );
  const topProducts = TopProducts.data;

  return (
    // You were missing this return statement
    <Carousel pause="hover" className="bg-primary mb-4">
      {topProducts?.map((product) => (
        <CarouselItem key={product._id}>
          <Link href={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              className="carousel-image"
              fluid
            />
            <CarouselCaption
              className="carousel-caption"
              style={{ left: 0, bottom: 0 }}
            >
              <h4 className="text-white text-right" style={{ margin: 0 }}>
                {product.name} (${product.price})
              </h4>
            </CarouselCaption>
          </Link>
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default TopProductCarousel;
