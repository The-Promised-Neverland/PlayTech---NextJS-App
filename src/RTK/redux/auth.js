import { createSlice } from "@reduxjs/toolkit";

const initialState = { userInfo: null };

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentialsLocal: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutLocal: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentialsLocal, logoutLocal } = auth.actions;

export default auth.reducer;
