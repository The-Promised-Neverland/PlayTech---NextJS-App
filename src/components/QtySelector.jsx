"use client";

import React, { useState } from "react";
import { FormControl } from "./ReactBootStrap";

const QtySelector = ({countInStock}) => {
  const [qty, setQty] = useState(1);
  return (
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
  );
};

export default QtySelector;
