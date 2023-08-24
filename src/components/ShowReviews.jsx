export const revalidate=0;

import React from "react";
import { ListGroupItem } from "./ReactBootStrap";
import Message from "./Message";
import Rating from "./Rating";

const ShowReviews = ({ reviews }) => {
  return ( 
    <>
      {reviews === 0 && <Message>No Reviews</Message>}

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
