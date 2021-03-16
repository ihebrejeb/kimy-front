import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '../../../Api/index.js';

export const createCourse = createAsyncThunk(
  'courses/addcourse',
  async (courses, thunkAPI) => {
    const response = await api.CreateCourses(courses)
    return response.data
  }
)

let initialState = { 
  values: [], 
 
}
export const coursesSlice = createSlice({
  name: 'courses',
  initialState ,
  reducers: {
    getcourses: ( state , action  )  => {
      state.values = action.payload; 
     
    },
    
   
     
  },
  extraReducers : {
 
  [createCourse.fulfilled]: (state, action) => {
    // Add user to the state array
    state.values.push(action.payload)
  },
},});


export const { getcourses , AddCourse  } = coursesSlice.actions;

//thunk
export const GetCourses = () => async (dispatch)  => {
    try {
      const { data } = await api.fetchCourses();
  
      dispatch( getcourses(data.data.data)  );
    } catch (error) {
      console.log(error.message);
    }
  };


//  export const createCourse =(courses )=> async(dispatch) => {
//    try {
//      const {data} = await api.CreateCourses(courses) ; 
//      dispatch( AddCourse( data) )
//    }
//    catch(error) {
//      console.log(error.message)
//    }
//  }







export const selectcourses = state => state.courses.values;


export default coursesSlice.reducer;
