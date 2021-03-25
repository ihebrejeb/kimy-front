import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../../Api/postApi.js';

export const createPosts = createAsyncThunk(
  'forum',
  async (post, thunkAPI) => {
    const response = await api.CreatePost(post)
    return response.data
  }
)
export const forumslice = createSlice({
  name: 'forum',
  initialState: {
    values: [],
  },
  reducers: {
   
  },
  extraReducers : {
 
    [createPosts.fulfilled]: (state, action) => {
      state.values.push(action.payload.data)
      console.log(action.payload)
    },
  },
});

export const {  } = forumslice.actions;


//sleecotors
export const selectForum = (state) => state.forum.values;

export default forumslice.reducer;