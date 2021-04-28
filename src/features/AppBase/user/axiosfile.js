import axios from "axios";

export const API_URL = "http://localhost:4000";

//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDNhZjUyZWUwZjE3MWQwOGRhZGYzMiIsImlhdCI6MTYxNzcxNTkyMywiZXhwIjoxNjIwMzA3OTIzfQ.MsZXfcKtR_lokPZADQ4vXJJYs_H0DWMH1ZUATga3OWI";

const user = JSON.parse(localStorage.getItem("user"));
console.log(user.token);


  export const Axios = axios.create({
  baseURL: API_URL,
  headers: { Authorization: "Bearer " + user.token },
});