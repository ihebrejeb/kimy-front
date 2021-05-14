import axios from "axios";

export const API_URL = "http://floating-cliffs-13024.herokuapp.com";

export const Axios = () =>
  axios.create({
    baseURL: API_URL,
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
    },
  });
