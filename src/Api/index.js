
import { Axios } from '../features/AppBase/user/axiosfile';

const url = "/courses";

export const fetchCourses = () => Axios.get(url);
export const CreateCourses = (newCourse) => Axios.post(url, newCourse);
export const UpdateCourses = (id, updatedCourse) =>
Axios.patch(`${url}/${id}`, updatedCourse);
export const deleteCourses = (id) => Axios.delete(`${url}/${id}`);
