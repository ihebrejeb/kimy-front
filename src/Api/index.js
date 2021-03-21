import axios from "axios";
const url = "http://localhost:5000/courses";

export const fetchCourses = () => axios.get(url);
export const CreateCourses = (newCourse) => axios.post(url, newCourse);
