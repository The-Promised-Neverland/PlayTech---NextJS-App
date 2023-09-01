"use client";

import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  ListGroupItem,
  FormControl,
} from "./ReactBootStrap";
import { FaTrash } from "react-icons/fa";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/RTK/slices/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ShowCart = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = async (data, orderQty) => {
    const cartSchema = {
      product: data.product, // id of the product
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: orderQty,
    };

    removeFromCart(data.product);
    dispatch(addToCart(cartSchema));
  };

  const RemoveFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const router = useRouter();

  const checkoutHandler = () => {
    router.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h2 style={{ marginBottom: "20px" }}>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty! <Link href="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              return (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col
                      md={2}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col
                      md={2}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Link
                        href={`/product/${item.product}`}
                        style={{ textDecoration: "none" }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col
                      md={2}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      ${item.price}
                    </Col>
                    <Col
                      md={2}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FormControl
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(Math.min(item.countInStock, 5)).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </FormControl>
                    </Col>
                    <Col
                      md={2}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => RemoveFromCartHandler(item.product)}
                      >
                        <FaTrash color="red" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3 style={{ padding: "0px" }}>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h3>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default ShowCart;
