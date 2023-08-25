"use client";

import React, { useState } from "react";
import { FormControl, ListGroupItem, Row, Col, Button } from "./ReactBootStrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/RTK/slices/cart";
import { toast } from "react-toastify";

const AddToCart = ({ countInStock, product }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    const cartSchema = {
      product: product._id, // id of the product
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    };
    dispatch(addToCart(cartSchema));
    toast.success("Added successfully", {
      autoClose: 500,
    });
  };

  return (
    <>
      {countInStock > 0 && (
        <ListGroupItem>
          <Row>
            <Col style={{ alignItems: "center", display: "flex" }}>Qty</Col>
            <Col>
              <FormControl
                as="select"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              >
                {[...Array(Math.min(countInStock, 5)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </FormControl>
            </Col>
          </Row>
        </ListGroupItem>
      )}

      {userInfo && userInfo.isAdmin === false && (
        <ListGroupItem style={{ display: "flex", justifyContent: "center" }}>
          {countInStock > 0 ? (
            <Button
              className="btn-block"
              type="button"
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
          ) : (
            <span>
              <strong>It's dry out here!</strong>
            </span>
          )}
        </ListGroupItem>
      )}
    </>
  );
};

export default AddToCart;
