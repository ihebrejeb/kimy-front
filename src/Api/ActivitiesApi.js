import axios from "axios";
const url = "http://localhost:4000/activity";

export const fetchCoursesActivities = () => axios.get(url);
export const CreateCoursesActivities = (newCourse) =>
  axios.post(url, newCourse);
export const UpdateCoursesActivities = (id, updatedCourse) =>
  axios.patch(`${url}/${id}`, updatedCourse);
export const deleteCoursesActivities = (id) => axios.delete(`${url}/${id}`);
