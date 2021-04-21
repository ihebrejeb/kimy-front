import axios from "axios";
const url = "http://localhost:4000/assignments/";
const urlsearch = "http://localhost:4000/assignments/searchassignment";
const urlSortAsc = "http://localhost:4000/assignments/sortAsc";
const urlSortDesc = "http://localhost:4000/assignments/sortDesc";

export const fetchAssignments = () => axios.get(url);
export const CreateAssignment = (assignment) => axios.post(url, assignment);
export const UpdateAssignments = (id, updatedAssignment) =>
  axios.patch(`${url}/${id}`, updatedAssignment);
export const deleteAssignment = (id) => axios.delete(`${url}/${id}`);
export const search = (search) => axios.get(`${urlsearch}/${search}`);
export const fetchSortedAsc = () => axios.get(urlSortAsc);
export const fetchSortedDesc = () => axios.get(urlSortDesc);
