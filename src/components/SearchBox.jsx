"use client"

import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
    } else {
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
      ></Form.Control>
      <Button type="submit" className="p-2 mx-2">
        <FaSearch />
      </Button>
    </Form>
  );
};

export default SearchBox;
