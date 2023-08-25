import {
  Carousel,
  Image,
  CarouselItem,
  CarouselCaption,
} from "@/components/ReactBootStrap";
import Link from "next/link";

const fetchTopProducts = async () => {
  const data = await fetch(
    "https://techverse-dtq7.onrender.com/api/products/top",
    {
      next: { revalidate: 3 },
    }
  );
  const res = await data.json();
  return res;
};

const TopProductCarousel = async () => {
  const topProducts = await fetchTopProducts();

  return (
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
