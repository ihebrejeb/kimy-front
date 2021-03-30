import axios from 'axios' 
const url = 'http://localhost:4000/forum' ;
const url1 = 'http://localhost:4000/forum/like' ;
const url3 = 'http://localhost:4000/forum/rate' ;



export const fetchPosts =  () =>   axios.get(url);
export const CreatePost =  (newPost) => axios.post(url , newPost);
export const UpdatePosts = (id , updatedPost) => axios.patch(`${url}/${id}` , updatedPost);
export const deletePosts = (id ) => axios.delete(`${url}/${id}` );
export const fetchOnePost = (id ) => axios.get(`${url}/${id}` );
export const AddLike= (id) => axios.patch(`${url1}/${id}`) ;
export const rating =(id) => axios.post(`${url3}/${id}`) ; 
