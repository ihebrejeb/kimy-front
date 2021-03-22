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
    updateCourse: (state , action) => {
        const payload = action.payload._id; 
         state.values.map((course)=> course._id === payload ? payload : course )
    },
    deletecourse: (state , action) => {
      const payload = action.payload; 

        state.values.filter((course)=>course._id !== payload )
    },
    
  },


  
  extraReducers : {
 
  [createCourse.fulfilled]: (state, action) => {
    state.values.push(action.payload)
  },
},});


export const { getcourses , AddCourse ,updateCourse, deletecourse  } = coursesSlice.actions;

//thunk
export const GetCourses = () => async (dispatch)  => {
    try {
      const { data } = await api.fetchCourses();
  
      dispatch( getcourses(data.data.data)  );
    } catch (error) {
      console.log(error.message);
    }
  };

  export const update =(id, course) => async(dispatch) => {
    try{
     const {data } =  await api.UpdateCourses(id , course)
     dispatch(updateCourse(data.data.data)) ; 

    }
    catch(error) {
      console.log(error.message)

    }
  }

export const deleteCourse=(id) => async(dispatch) => {
  try{
    await api.deleteCourses(id);
    dispatch(deleteCourse(id))
  }
  catch{

  }
}
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
