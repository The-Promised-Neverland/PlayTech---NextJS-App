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
  Spinner,
  Table,
  Placeholder,
} from "react-bootstrap";

const { Image: PlaceholderImage } = Placeholder;
const { Item: CarouselItem, Caption: CarouselCaption } = Carousel;

const { Img: CardImg, Body: CardBody, Title: CardTitle, Text: CardText } = Card;

const { Item: PaginationItem } = Pagination;

const { Item: ListGroupItem } = ListGroup;

const { Item: NavItem, Link: NavLink } = Nav;

const { Brand: NavbarBrand } = Navbar;

const { Item: NavDropdownItem } = NavDropdown;

const {
  Group: FormGroup,
  Control: FormControl,
  Label: FormLabel,
  Check: FormCheck,
} = Form;

// Export the imported components
export {
  FormCheck,
  NavLink,
  NavbarBrand,
  NavItem,
  PlaceholderImage,
  NavDropdownItem,
  Table,
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
  Placeholder,
};
