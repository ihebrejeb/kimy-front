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

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const GetCourses = () => async (dispatch)  => {
 
 
    try {
      const { data } = await api.fetchCourses();
  
      dispatch({ type: getcourses, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
 


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectcourses = state => state.courses.value;

export default coursesSlice.reducer;
