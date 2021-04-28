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

const registerg = (username, email, birthdate, avatar, isgoogle) => {
  return axios.post("http://localhost:4000/user/signupg", {
    username,
    email,
    birthdate,
    avatar,
    isgoogle,
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

const loging = (email) => {
  console.log('im here')
  return axios.post("http://localhost:4000/user/loging", {
      email,
    })
    .then((response) => {
        console.log('local storage')
        localStorage.setItem("user", JSON.stringify(response.data));
      return response.data; 
    });
};


const UpdatePassword = (id, email, password, newpassword) => {
  console.log('updatin password first')
  return axios.post("http://localhost:4000/user/updatepassword", {
      id,
      email,
      password,
      newpassword
    }).then((response) => {
      localStorage.removeItem("user");
      window.location.reload(false);
    });
};

const logout = () => {
  localStorage.removeItem("user");
  console.log('were loggin out')
};

export default {
  register,
  registerg,
  login,
  loging,
  logout,
  UpdatePassword
};
