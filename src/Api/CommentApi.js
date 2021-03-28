import axios from 'axios'
const url = 'http://localhost:4000/forum/comment' ;

export const DeleteComment = (id , C_id) => axios.delete(`${url}/${id}/${C_id}`) ; 
export const postComment =  (id, newcomment) => axios.post(`${url}/${id}` , newcomment);
