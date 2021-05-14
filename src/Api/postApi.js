import { Axios } from "../features/AppBase/user/axiosfile";
const url = "/forum";
const url0 = "/forum/getbyCourse";
const url1 = "/forum/like";
const url3 = "/forum/rate";
const url4 = "/forum/unlike";
const url5 = "/forum/search";
const url6 = "/forum/sort";
const url7 = "/forum/sortByRate";
const url8 = "/forum/sortByViews";
const url9 = "/forum/topPost";

export const fetchViral = (courseid) => Axios().get(`${url9}/${courseid}`);
export const fetchSorted = (courseid) => Axios().get(`${url6}/${courseid}`);
export const fetchSortedByRate = (courseid) =>
  Axios().get(`${url7}/${courseid}`);
export const fetchSortedByViews = (courseid) =>
  Axios().get(`${url8}/${courseid}`);
export const fetchPosts = (courseid) => Axios().get(`${url0}/${courseid}`);
export const CreatePost = (newPost) => Axios().post(url, newPost);
export const UpdatePosts = (id, updatedPost) =>
  Axios().patch(`${url}/${id}`, updatedPost);
export const deletePosts = (id) => Axios().delete(`${url}/${id}`);
export const fetchOnePost = (id) => Axios().get(`${url}/${id}`);
export const AddLike = (id) => Axios().patch(`${url1}/${id}`);
export const rating = (id, newRate) => Axios().post(`${url3}/${id}`, newRate);
export const removeLike = (id) => Axios().patch(`${url4}/${id}`);
export const search = (search, courseid) =>
  Axios().get(`${url5}/${search}/${courseid}`);
