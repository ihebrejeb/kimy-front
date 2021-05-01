import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../Api/postApi.js";
import * as CommentApi from "../../../Api/CommentApi.js";

// Post functionalities using CreateSyncThunk  check extraReducers also 
export const createComment = createAsyncThunk(
  "",
  async (Data_comment, thunkAPI) => {
    const response = await CommentApi.postComment(
      Data_comment.postId,
      Data_comment.CommentData
    );

    return response.data;
  }
);

export const createPosts = createAsyncThunk("forum", async (post, thunkAPI) => {
  const response = await api.CreatePost(post);
  return response.data;
});
///////

export const forumslice = createSlice({
  name: "forum",
  initialState: {
    values: [],
    post: {},
    viral: [],
  },
  reducers: {
    getPost: (state, action) => {
      state.values = action.payload;
    },
    getSortedByLikes : (state , action )=> {
      state.values= action.payload ;
    },
    getViral: (state, action) => {
      state.viral = action.payload;
    },
    UnlistPost: (state, action) => {
      const payload = action.payload;

      state.values = state.values.filter((forum) => forum._id !== payload);
    },

    getOne: (state, action) => {
      state.post = action.payload;
    },
    DeleteCommento: (state, action) => {
      const payload = action.payload;
      state.post.comments = state.post.comments.filter(
        (comment) => comment._id !== payload
      );
    },
    searchAction: (state,action) => {
      state.values = action.payload
    },
    Like: (state, action) => {
      const payload = action.payload._id;
      state.values = state.values.map((forum) =>
        forum._id === payload ? action.payload : forum
      );
    },
    rate: (state, action) => {
      state.post.rate.push(action.payload);
    },
  },
  extraReducers: {
    [createPosts.fulfilled]: (state, action) => {
      state.values.push(action.payload.data);
    },
    [createComment.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.post.comments = action.payload;
    },
  },
});

export const {
  rate,
  getPost,
  UnlistPost,
  getOne,
  DeleteCommento,
  Like,
  getViral,
  searchAction,
  getSortedByLikes
} = forumslice.actions;

//thunk

// get posts 
export const getPosts = (courseid) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(courseid);

    dispatch(getPost(data.data));
  } catch (error) {
    console.log(error.message);
  }
};
export const getViralPost = (courseid) => async (dispatch) => {
  try {
    const { data } = await api.fetchViral(courseid);

    dispatch(getViral(data));
    console.log(data)
  } catch (error) {
    console.log(error.message);
  }
};
// sorted list of posts  by likes
export const getSortedWithLikes = (courseid) => async (dispatch) => {
  try {
    const { data } = await api.fetchSorted(courseid);

    dispatch(getSortedByLikes(data));
    console.log(data)
  } catch (error) {
    console.log(error.message);
  }
};
export const getSortedWithViews = (courseid) => async (dispatch) => {
  try {
    const { data } = await api.fetchSortedByViews(courseid);

    dispatch(getPost(data));
    console.log(data)
  } catch (error) {
    console.log(error.message);
  }
};
export const getSortedWithRating = (courseid) => async (dispatch) => {
  try {
    const { data } = await api.fetchSortedByRate(courseid);

    dispatch(getPost(data));
    console.log(data)
  } catch (error) {
    console.log(error.message);
  }
};
// get a post by id 
export const getOnePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchOnePost(id);

    dispatch(getOne(data.data));
  } catch (error) {
    console.log(error.message);
  }
};
// search feature
export const searchThread = (search , courseid) => async (dispatch) => {
  try {
    const { data } = await api.search(search,courseid);

    dispatch(searchAction(data));
  } catch (error) {
    console.log(error.message);
  }
};
//   delete async function 
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePosts(id);
    dispatch(UnlistPost(id));
  } catch {}
};
// remove comment 
export const Removecomment = (id, C_id) => async (dispatch) => {
  try {
    await CommentApi.DeleteComment(id, C_id);
    dispatch(DeleteCommento(C_id));
  } catch {}
};
// like feature
export const addLike = (id) => async (dispatch) => {
  try {
    const { data } = await api.AddLike(id);
    dispatch(Like(data));
  } catch (error) {
    console.log(error.message);
  }
};
// unlike feature
export const unlike = (id) => async (dispatch) => {
  try {
    const { data } = await api.removeLike(id);
    dispatch(Like(data));
  } catch (error) {
    console.log(error.message);
  }
};
//Rate
export const addrate = (postId, formData) => async (dispatch) => {
  try {
    const rating = { rating: formData };
    const { data } = await api.rating(postId, rating);
    dispatch(rate(data));
  } catch (error) {
    console.log(error.message);
  }
};

//selectors
export const selectForum = (state) => state.forum.values;
export const selectPost = (state) => state.forum.post;
export const selectViral = (state) => state.forum.viral;
export default forumslice.reducer;
