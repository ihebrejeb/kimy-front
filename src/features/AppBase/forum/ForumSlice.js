import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../../Api/postApi.js';
import * as CommentApi from '../../../Api/CommentApi.js';
import axios from 'axios';


export const createComment = createAsyncThunk(
  '',
  async ( id ,comment , thunkAPI) => {
    const response = await CommentApi.postComment(id , comment)
    return response.data 
  }
)

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
    post : [] , 

  },
  reducers: {
      getPost :(state,action) => {
        state.values= action.payload

      },
      UnlistPost: (state,action) => {
        const payload = action.payload; 
        
        state.values = state.values.filter((forum)=>forum._id !== payload )
      },
      getOne:(state,action) => {
        state.post= action.payload
      },
      DeleteCommento : ( state, action) => {
        const payload = action.payload; 
        state.post.comments = state.post.filter((comment)=>comment._id !== payload )
      }
  },
  extraReducers : {
 
    [createPosts.fulfilled]: (state, action) => {
      state.values.push(action.payload.data)
    },
    [createComment.fulfilled]: (state, action) => {
       state.coment.push(action.payload.data)
    },
  },
});


export const { getPost , UnlistPost , getOne ,DeleteCommento} = forumslice.actions;

//thunk
export const getPosts = () => async (dispatch)  => {
  try {
    const { data } = await api.fetchPosts();

    dispatch( getPost(data.data)  );
  } catch (error) {
    console.log(error.message);
  }
};
export const getOnePost = id => async (dispatch)  => {
  try {
    const { data } = await api.fetchOnePost(id);

    dispatch( getOne(data.data)  );
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost=(id) => async(dispatch) => {
  try{
    await api.deletePosts(id);
    dispatch(UnlistPost(id))
  }
  catch{

  }
}
export const Removecomment= ( id , C_id) => async(dispatch) => {
 
  try {
    await CommentApi.DeleteComment(id , C_id)
    dispatch(DeleteCommento(C_id))

  }
  catch{

  }
}



//sleecotors
export const selectForum = (state) => state.forum.values;
export const selectPost = (state) => state.forum.post;

export default forumslice.reducer;