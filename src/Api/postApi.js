import axios from 'axios' 
const url = 'http://localhost:4000/forum' ;

export const fetchPosts =  () =>   axios.get(url);
export const CreatePost =  (newPost) => axios.post(url , newPost);
export const UpdatePosts = (id , updatedPost) => axios.patch(`${url}/${id}` , updatedPost);
export const deletePosts = (id ) => axios.delete(`${url}/${id}` );
export const fetchOnePost = (id ) => axios.get(`${url}/${id}` );
