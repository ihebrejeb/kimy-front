import axios from "axios";

export const API_URL = "http://localhost:4000";

export const Axios = () =>
  axios.create({
    baseURL: API_URL,
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
    },
  });
