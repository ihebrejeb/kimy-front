import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as api from "../../../Api/AssignmentsApi";

export const createnewAssignment = createAsyncThunk(
  "assignment",

  async (assignments, thunkAPI) => {
    const response = await api.CreateAssignment(assignments);
    console.log(response.data);

    return response.data;
  }
);

let initialState = {
  values: [],
};
export const AssignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    getSortedDesc: (state, action) => {
      state.values = action.payload;
    },
    getSortedASC: (state, action) => {
      state.values = action.payload;
    },
    searchAssignment: (state, action) => {
      state.values = action.payload;
    },
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
      console.log(action.payload.data);
    },
  },
});

export const {
  getAssignments,
  updateAssignments,
  deleteAssignmentsRedcuer,
  searchAssignment,
  getSortedASC,
  getSortedDesc,
} = AssignmentsSlice.actions;

//thunk
export const getSortedDescendant = () => async (dispatch) => {
  try {
    const { data } = await api.fetchSortedDesc();

    dispatch(getSortedDesc(data));
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
export const getSortedAscendant = () => async (dispatch) => {
  try {
    const { data } = await api.fetchSortedAsc();

    dispatch(getSortedASC(data));
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
export const searchThread = (search) => async (dispatch) => {
  try {
    const { data } = await api.search(search);

    dispatch(searchAssignment(data));
  } catch (error) {
    console.log(error.message);
  }
};
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

export const selectassignments = (state) => state.assignments.values;

export default AssignmentsSlice.reducer;
