"use client";

import {
  Container,
  Row,
  Col,
  Carousel,
  Image,
  Badge,
  Navbar,
  Nav,
  NavDropdown,
  Card,
  Pagination,
  ListGroup,
  Form,
  Alert,
  Button,
  Spinner
} from "react-bootstrap";

const { Item: CarouselItem, Caption: CarouselCaption } = Carousel;

const { Img: CardImg, Body: CardBody, Title: CardTitle, Text: CardText } = Card;

const { Item: PaginationItem } = Pagination;

const { Item: ListGroupItem } = ListGroup;

const { Group: FormGroup, Control: FormControl, Label: FormLabel } = Form;

// Export the imported components
export {
  Spinner,
  Alert,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  ListGroup,
  ListGroupItem,
  Pagination,
  PaginationItem,
  Container,
  Row,
  Col,
  Carousel,
  Image,
  Card,
  Badge,
  Navbar,
  Nav,
  NavDropdown,
  CarouselItem,
  CarouselCaption,
  CardText,
  CardImg,
  CardBody,
  Button,
  CardTitle,
};
