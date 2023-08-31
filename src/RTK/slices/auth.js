import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  userInfo: Cookies.get("userInfo")
    ? { ...JSON.parse(Cookies.get("userInfo")) }
    : null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentialsLocal: (state, action) => {
      state.userInfo = action.payload;
      Cookies.set("userInfo", JSON.stringify(action.payload));
    },
    logoutLocal: (state, action) => {
      Cookies.remove("userInfo");
      state.userInfo = null;
    },
  },
});

export const { setCredentialsLocal, logoutLocal } = auth.actions;

export default auth.reducer;
