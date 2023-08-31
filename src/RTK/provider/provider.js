"use client";

import { Provider } from "react-redux";
import store from "../store/store";

const MyStoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default MyStoreProvider;
