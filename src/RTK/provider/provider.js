"use client";

import { Provider } from "react-redux";
import store from "../store/store";
import { loadUserCredentials } from "../slices/auth";
import { useEffect } from "react";
import { loadCartCredentials } from "../slices/cart";

const MyStoreProvider = ({ children }) => {
  store.dispatch(loadUserCredentials());
  store.dispatch(loadCartCredentials());

  return <Provider store={store}>{children}</Provider>;
};

export default MyStoreProvider;
