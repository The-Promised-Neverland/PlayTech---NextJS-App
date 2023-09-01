"use client";

import {
  Badge,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  NavDropdownItem,
  NavbarBrand,
  NavLink,
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
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect fixed="top">
        <Container
          style={{ maxWidth: "inherit", marginLeft: "2%", marginRight: "2%" }}
        >
          <Link href="/" style={{ textDecoration: "none", display: "flex" }}>
            <NavbarBrand>
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
            </NavbarBrand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />

              {userInfo && !userInfo.isAdmin && (
                <NavLink as={Link} href="/cart">
                  <FaShoppingCart />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </NavLink>
              )}

              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <NavDropdownItem as={Link} href="/profile">
                    Profile
                  </NavDropdownItem>
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
