import { Axios } from '../features/AppBase/user/axiosfile';
const url = '/forum/comment' ;

export const DeleteComment = (id , C_id) => Axios.delete(`${url}/${id}/${C_id}`) ; 
export const postComment =  (id, newcomment) => Axios.post(`${url}/${id}`, newcomment);
