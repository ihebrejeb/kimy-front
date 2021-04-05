import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as api from "../../../Api/ActivitiesApi";

export const createCourseActivities = createAsyncThunk(
  "activites/addActivity",
  async (coursesActivities, thunkAPI) => {
    const response = await api.CreateCoursesActivities(coursesActivities);
    return response.data;
  }
);

let initialState = {
  values: [],
};
export const coursesActivitiesSlice = createSlice({
  name: "coursesActivities",
  initialState,
  reducers: {
    getcoursesActivities: (state, action) => {
      console.log(action.payload);
      state.values = action.payload;
    },
    updateCourseActivities: (state, action) => {
      const payload = action.payload._id;
      state.values = state.values.map((courseActivity) =>
        courseActivity._id === payload ? action.payload.data : courseActivity
      );
      console.log(action.payload);
    },
    deletecourseActivitiesRedcuer: (state, action) => {
      const payload = action.payload;

      state.values = state.values.filter(
        (courseActivity) => courseActivity._id !== payload
      );
    },
  },

  extraReducers: {
    [createCourseActivities.fulfilled]: (state, action) => {
      state.values.push(action.payload.data);
    },
  },
});

export const {
  getcoursesActivities,
  updateCourseActivities,
  deletecourseActivitiesRedcuer,
} = coursesActivitiesSlice.actions;

//thunk
export const GetCoursesActivities = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCoursesActivities();

    dispatch(getcoursesActivities(data.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const update = (id, courseActivity) => async (dispatch) => {
  try {
    const { data } = await api.UpdateCoursesActivities(id, courseActivity);
    dispatch(updateCourseActivities(data.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCourseActivities = (id) => async (dispatch) => {
  try {
    await api.deleteCoursesActivities(id);
    dispatch(deletecourseActivitiesRedcuer(id));
  } catch {}
};

// export const createCourse = (courses) => async (dispatch) => {
//   try {
//     const { data } = await api.CreateCourses(courses);
//     dispatch(AddCourse(data));
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const selectactivities = (state) => state.coursesActivities.values;

export default coursesActivitiesSlice.reducer;
