import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const updateCart = (state) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping price (If order is above $100 then free, else $10 shipping fee)

  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  // Calculate tax price

  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  Cookies.set("cart", JSON.stringify(state));

  return state;
};

// --------------x----------------------------x----------------------------x--------------------------------x------------------------------x--------------------

const initialState = Cookies.get("cart")
  ? { ...JSON.parse(Cookies.get("cart")) }
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "Paypal",
    };

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
      return updateCart(state);
    },
    saveShippingAddrress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartitems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddrress,
  savePaymentMethod,
  clearCartitems,
  loadCartCredentials,
} = cart.actions;

export default cart.reducer;
