import { Axios } from "../features/AppBase/user/axiosfile";

const url = "/activity";
const urlsearch = "/activity/search";
const urlSort = "/activity/sort";
const urlActivityCourse = "/activity/getbyCourse";

//export const fetchCoursesActivities = () => Axios().get(url);
export const CreateCoursesActivities = (newCourseActivity) =>
  Axios().post(url, newCourseActivity);
export const UpdateCoursesActivities = (id, updatedCourseActivity) =>
  Axios().patch(`${url}/${id}`, updatedCourseActivity);
export const deleteCoursesActivities = (id) => Axios().delete(`${url}/${id}`);
export const search = (search) => Axios().get(`${urlsearch}/${search}`);
export const fetchSorted = () => Axios().get(urlSort);
export const fetchActivitiesByCourse = (courseid) =>
  Axios().get(`${urlActivityCourse}/${courseid}`);
