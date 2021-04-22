import axios from "axios";
import { useHistory } from "react-router-dom";

const API_URL = "http://localhost:4000/";


const register = (username, email, password, confirmpassword, birthdate, avatar) => {
  return axios.post("http://localhost:4000/user/signup", {
    username,
    email,
    password,
    confirmpassword,
    birthdate,
    avatar,
  }).then((response) => {
    
      console.log('local storage')
      localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  });
};

const login = (email, password) => {
  console.log('im here')
  return axios.post("http://localhost:4000/user/login", {
      email,
      password,
    })
    .then((response) => {
        console.log('local storage')
        localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  console.log('were loggin out')
};

export default {
  register,
  login,
  logout,
};
