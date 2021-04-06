import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '../actions/api.js';



 export const createUser = createAsyncThunk(
  'users/adduser',
  async (users, thunkAPI) => {
    const response = await api.CreateUser(users)
    return response.data
  }
) 

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: null,
  },
  reducers: {
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

export const { getUsers, updateUser, deleteuserReducer } = usersSlice.actions;

export const GetUsers = () => async (dispatch)  => {
  try {
    const { data } = await api.fetchUser();
    console.log("2")

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

export const selectusers = state => state.users.userslist.users;

export default usersSlice.reducer; 