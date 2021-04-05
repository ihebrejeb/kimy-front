import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  selected: {},
  user: {
    name: "iheb rejeb",
    email: "iheb@rejeb.tn",
    id: "605469fc09b917eb1fef8b6f",
  },
};
export const coursedemoSlice = createSlice({
  name: "coursedemo",
  initialState,
  reducers: {
    selectCourse: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { selectCourse } = coursedemoSlice.actions;

export const selectedcourse = (state) => state.coursedemo.selected;
export const user = (state) => state.coursedemo.user;

export default coursedemoSlice.reducer;
