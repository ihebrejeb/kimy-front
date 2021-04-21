import axios from "axios";
const url = "http://localhost:4000/assignments/";
const urlsearch = "http://localhost:4000/assignments/searchassignment";

export const fetchAssignments = () => axios.get(url);
export const CreateAssignment = (assignment) => axios.post(url, assignment);
export const UpdateAssignments = (id, updatedAssignment) =>
  axios.patch(`${url}/${id}`, updatedAssignment);
export const deleteAssignment = (id) => axios.delete(`${url}/${id}`);
export const search = (search) => axios.get(`${urlsearch}/${search}`);
