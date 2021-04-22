import { createSlice } from "@reduxjs/toolkit";

export const userslice = createSlice({
  name: "user",
  initialState: {
    user: {
      email: "user@esprit.tn",
    },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userslice.actions;

//sleecotors
export const selectuser = (state) => state.user.user;

export default userslice.reducer;
