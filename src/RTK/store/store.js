import { configureStore } from "@reduxjs/toolkit";
import { api } from "../API/api";
import cartReducer from "../redux/cart";
import authReducer from "../redux/auth";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

export default store;
