import axios from "axios";
const url = "http://localhost:4000/assignments";

export const fetchAssignments = () => axios.get(url);
export const CreateAssignment= (assignment) =>
  axios.post(url, assignment);
export const UpdateAssignments = (id, updatedAssignment) =>
  axios.patch(`${url}/${id}`, updatedAssignment);
export const deleteAssignment = (id) => axios.delete(`${url}/${id}`);
