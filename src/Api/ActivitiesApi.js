import axios from "axios";
const url = "http://localhost:4000/activity";

export const fetchCoursesActivities = () => axios.get(url);
export const CreateCoursesActivities = (newCourseActivity) =>
  axios.post(url, newCourseActivity);
export const UpdateCoursesActivities = (id, updatedCourseActivity) =>
  axios.patch(`${url}/${id}`, updatedCourseActivity);
export const deleteCoursesActivities = (id) => axios.delete(`${url}/${id}`);
