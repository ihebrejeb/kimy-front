import { createSlice } from '@reduxjs/toolkit';

import * as api from '../../../Api/index.js';

export const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    value: [],
  },
  reducers: {
    getcourses: ( state , action  )  => {
      state.value = action.payload; 
     
    },
    
    setErrors(state, action) {
      state.errors = action.payload;
      }, 
     
  },
});

export const { getcourses , setErrors  } = coursesSlice.actions;

//thunk
export const GetCourses = () => async (dispatch)  => {
    try {
      const { data } = await api.fetchCourses();
  
      dispatch({ type: getcourses, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
 

export const selectcourses = state => state.courses.value;


export default coursesSlice.reducer;
