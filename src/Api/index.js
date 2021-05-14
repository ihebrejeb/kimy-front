import { Axios } from "../features/AppBase/user/axiosfile";

const url = "/courses";
const url1 = "/courses/search";
const url2 = "/courses/enroll";

export const fetchCourses = () => Axios().get(url);
export const CreateCourses = (newCourse) => Axios().post(url, newCourse);
export const UpdateCourses = (id, updatedCourse) =>
  Axios().patch(`${url}/${id}`, updatedCourse);
export const Enroll = (id) => Axios().post(`${url2}/${id}`);
export const deleteCourses = (id) => Axios().delete(`${url}/${id}`);
export const searchByCode = (search) => Axios().get(`${url1}/${search}`);
