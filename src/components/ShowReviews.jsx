import React from "react";
import { ListGroupItem } from "./ReactBootStrap";
import Message from "./Message";
import Rating from "./Rating";


const fetchReviews = async (productID) => {
  const data = await fetch(
    `https://techverse-dtq7.onrender.com/api/products/${productID}`,
    {
      cache: "no-store"
    }
  );
  const res = await data.json();
  return res.reviews;
};

const ShowReviews = async ({productID}) => {
  const reviews=await fetchReviews(productID);
  return ( 
    <>
      {reviews.length === 0 && <Message>No Reviews</Message>}

      {reviews.map((review) => (
        <ListGroupItem key={review._id}>
          <strong>{review.name}</strong>
          <Rating value={review.rating} />
          <p>{review.createdAt.substring(0, 10)}</p>
          <p>{review.comment}</p>
        </ListGroupItem>
      ))}
    </>
  );
};

export default ShowReviews;
