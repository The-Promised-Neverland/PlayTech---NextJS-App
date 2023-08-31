"use client";

import {
  Badge,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  NavDropdownItem,
} from "./ReactBootStrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { logoutLocal } from "@/RTK/slices/auth";
import SearchBox from "./SearchBox";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const logout = async () => {
  await fetch("https://techverse-dtq7.onrender.com/api/users/logout", {
    method: "POST",
    credentials: "include",
  });
};

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    try {
      await logout();
      dispatch(logoutLocal());
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header style={{ backgroundColor: "red" }}>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect fixed="top">
        <Container
          style={{ maxWidth: "inherit", marginLeft: "2%", marginRight: "2%" }}
        >
          <Link href="/" style={{ textDecoration: "none", display: "flex" }}>
            <Navbar.Brand>
              <div>PlayTech</div>
              {userInfo && userInfo.isAdmin && (
                <div
                  style={{
                    fontSize: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Admin Mode
                </div>
              )}
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />

              {userInfo && !userInfo.isAdmin && (
                <Link
                  href="/cart"
                  style={{
                    display: "flex",
                    alignItems: "center",

                    textDecoration: "none",
                  }}
                >
                  <FaShoppingCart />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Link>
              )}
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {/* <Link
                    href="/profile"
                    style={{ display: "flex", textDecoration: "none" }}
                  > */}
                  <NavDropdownItem as={Link} href="/profile">
                    Profile
                  </NavDropdownItem>
                  {/* </Link> */}
                  <NavDropdownItem onClick={logoutHandler}>
                    Logout
                  </NavDropdownItem>
                </NavDropdown>
              ) : (
                <Link
                  href="/login"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <FaUser />
                  Sign in
                </Link>
              )}
              {userInfo && userInfo.isAdmin === true && (
                <NavDropdown
                  title="Admin"
                  id="adminmenu"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Link href="/admin/orderList">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </Link>
                  <Link href="/admin/productList">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </Link>
                  <Link href="/admin/userList">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </Link>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
