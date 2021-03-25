import axios from 'axios' 
const url = 'http://localhost:4000/forum' ;


export const CreatePost =  (newPost) => axios.post(url , newPost);
