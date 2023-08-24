"use client";

import React, { useState } from "react";
import {
  ListGroupItem,
  FormControl,
  FormLabel,
  FormGroup,
  Form,
  Button,
  Spinner,
} from "./ReactBootStrap";
import Link from "next/link";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useCreateReviewMutation } from "@/RTK/API/productsApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ReviewInput = ({ productId }) => {
  const router = useRouter();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: postingReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault(); 
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      router.refresh();
      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <ListGroupItem style={{ padding: 0 }}>
      <h2>Write a Review</h2>

      {userInfo ? (
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="rating" className="my-2">
            <FormLabel>Rating</FormLabel>
            <FormControl
              as="select"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value="">Select...</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="comment" className="my-2">
            <FormLabel>Comment</FormLabel>
            <FormControl
              as="textarea"
              row="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></FormControl>
          </FormGroup>
          <Button
            disabled={postingReview === true}
            type="submit"
            variant="primary"
          >
            {postingReview === true && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginRight: "1rem" }}
              />
            )}
            Post Review
          </Button>
        </Form>
      ) : (
        <Message>
          Please{" "}
          <Link href="/login" style={{ marginLeft: "4px", marginRight: "4px" }}>
            login
          </Link>{" "}
          to write a review.
        </Message>
      )}
    </ListGroupItem>
  );
};

export default ReviewInput;
