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
      state.userInfo = null;
      Cookies.remove("userInfo");
    },
  },
});

export const { setCredentialsLocal, logoutLocal, loadUserCredentials } =
  auth.actions;

export default auth.reducer;
