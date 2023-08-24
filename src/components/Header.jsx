"use client";

import { Badge, Navbar, Nav, Container, NavDropdown } from "./ReactBootStrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "@/RTK/API/usersApi";
import { loadCredentials, logoutLocal } from "@/RTK/redux/auth";
import SearchBox from "./SearchBox";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCredentials());
  }, []);

  const router = useRouter();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [logout] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logout().unwrap();
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
              <div>Techverse</div>
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
                  <Nav.Link>
                    <FaShoppingCart />
                    Cart
                    {cartItems.length > 0 && (
                      <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                </Link>
              )}
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Link
                    href="/profile"
                    style={{ display: "flex", textDecoration: "none" }}
                  >
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
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
