import { Axios } from "../features/AppBase/user/axiosfile";
const url = "/assignments/";
const urlsearch = "/assignments/searchassignment";
const urlSortAsc = "/assignments/sortAsc";
const urlSortDesc = "/assignments/sortDesc";

export const fetchAssignments = () => Axios.get(url);
export const CreateAssignment = (assignment) => Axios.post(url, assignment);
export const UpdateAssignments = (id, updatedAssignment) =>
  Axios.patch(`${url}/${id}`, updatedAssignment);
export const deleteAssignment = (id) => Axios.delete(`${url}/${id}`);
export const search = (search) => Axios.get(`${urlsearch}/${search}`);
export const fetchSortedAsc = () => Axios.get(urlSortAsc);
export const fetchSortedDesc = () => Axios.get(urlSortDesc);
export const fetchOneAssignment = (id) => Axios.get(`${url}/${id}`);
