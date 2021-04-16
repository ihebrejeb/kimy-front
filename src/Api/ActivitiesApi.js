import axios from "axios";
const url = "http://localhost:4000/activity";
const urlsearch = "http://localhost:4000/activity/search";

export const fetchCoursesActivities = () => axios.get(url);
export const CreateCoursesActivities = (newCourseActivity) =>
  axios.post(url, newCourseActivity);
export const UpdateCoursesActivities = (id, updatedCourseActivity) =>
  axios.patch(`${url}/${id}`, updatedCourseActivity);
export const deleteCoursesActivities = (id) => axios.delete(`${url}/${id}`);
export const search = (search) => axios.get(`${urlsearch}/${search}`);
