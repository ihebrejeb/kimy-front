/* import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '../actions/api.js';



 export const createUser = createAsyncThunk(
  'users/adduser',
  async (users, thunkAPI) => {
    const response = await api.CreateUser(users)
    return response.data
  }
) 

export const userslice = createSlice({
  name: 'user',
  initialState: {
    value: null,
  },
  reducers: {
    login:(state,action )  => {
      state.user = action.payload ;
      
    },
   
    logout: (state ) => {
      state.user = null ;
    },
    getUsers: ( state , action  )  => {
      state.values = action.payload; 
    },
    updateUser: (state , action) => {
        const payload = action.payload._id; 
         state.values.map((user)=> user._id === payload ? payload : user )
    },
    deleteuserReducer: (state , action) => {
      const payload = action.payload; 

        state.values.filter((user)=>user._id !== payload )
    },
  },
  extraReducers : {
 
    [createUser.fulfilled]: (state, action) => {
      state.values.push(action.payload)
    },
  },
});

export const { login, logout, getUsers, updateUser, deleteuserReducer } = userslice.actions;

export const GetUsers = () => async (dispatch)  => {
  try {
    const { data } = await api.fetchUsers();
    console.log('2')

    dispatch( getUsers(data.data)  );
  } catch (error) {
    console.log(error.message);
  }
};

export const update =(id, user) => async(dispatch) => {
  try{
   const {data } =  await api.UpdateUser(id , user)
   dispatch(updateUser(data.data)) ; 

  }
  catch(error) {
    console.log(error.message)

  }
}

export const deleteUser=(id) => async(dispatch) => {
try{
  await api.deleteUser(id);
  dispatch(deleteuserReducer(id))
}
catch{

}
}

export const selectusers = state => state.users.values;

export const selectuser = (state) => state.user.user;

export default userslice.reducer; */

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
