import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as api from "../../../Api/AssignmentsApi";

export const createnewAssignment = createAsyncThunk(
  "assignment/addAssignment",

  async (assignmentss, thunkAPI) => {
    // console.log("helo slice1");
    //console.log(response.data);
    const response = await api.CreateAssignment(assignmentss);
    console.log("hello slice");
    return response.data.data;
  }
);

let initialState = {
  values: [],
};
export const AssignmentsSlice = createSlice({
  name: "assignmentss",
  initialState,
  reducers: {
    getAssignments: (state, action) => {
      console.log(action.payload);
      state.values = action.payload;
    },
    updateAssignments: (state, action) => {
      const payload = action.payload._id;
      state.values = state.values.map((assignment) =>
        assignment._id === payload ? action.payload.data : assignment
      );
      console.log(action.payload);
    },
    deleteAssignmentsRedcuer: (state, action) => {
      const payload = action.payload;

      state.values = state.values.filter(
        (assignment) => assignment._id !== payload
      );
    },
  },

  extraReducers: {
    [createnewAssignment.fulfilled]: (state, action) => {
      state.values.push(action.payload.data);
    },
  },
});

export const {
  getAssignments,
  updateAssignments,
  deleteAssignmentsRedcuer,
} = AssignmentsSlice.actions;

//thunk
export const GetAssignments = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAssignments();

    dispatch(getAssignments(data.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const updateAssign = (id, assignment) => async (dispatch) => {
  try {
    const { data } = await api.UpdateAssignments(id, assignment);
    dispatch(updateAssignments(data.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAssignments = (id) => async (dispatch) => {
  try {
    await api.deleteAssignment(id);
    dispatch(deleteAssignmentsRedcuer(id));
  } catch {}
};

export const selectassignments = (state) => state.assignmentss.values;

export default AssignmentsSlice.reducer;
