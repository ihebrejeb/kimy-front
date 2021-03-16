import { createSlice } from '@reduxjs/toolkit';

import * as api from '../../../Api/index.js';

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
    
    AddCourse (state, action) {
      
     state.values = [...state.values, action.payload]
      }, 
     
  },
});

export const { getcourses , AddCourse  } = coursesSlice.actions;

//thunk
export const GetCourses = () => async (dispatch)  => {
    try {
      const { data } = await api.fetchCourses();
  
      dispatch({ type: getcourses, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };


 export const createCourse =(courses )=> async(dispatch) => {
   try {
     const {data} = await api.CreateCourses(courses) ; 
     dispatch({type :  AddCourse , payload : data})
   }
   catch(error) {
     console.log(error.message)
   }
 }




export const selectcourses = state => state.courses.values;


export default coursesSlice.reducer;
