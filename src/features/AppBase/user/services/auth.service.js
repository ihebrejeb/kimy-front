import axios from "axios";
import { useHistory } from "react-router-dom";

const API_URL = "https://floating-cliffs-13024.herokuapp.com/";

const register = (
  username,
  email,
  password,
  confirmpassword,
  birthdate,
  avatar
) => {
  return axios
    .post("https://floating-cliffs-13024.herokuapp.com/user/signup", {
      username,
      email,
      password,
      confirmpassword,
      birthdate,
      avatar,
    })
    .then((response) => {
      console.log("local storage");
      localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    });
};

const registerg = (username, email, birthdate, avatar, isgoogle) => {
  return axios
    .post("https://floating-cliffs-13024.herokuapp.com/user/signupg", {
      username,
      email,
      birthdate,
      avatar,
      isgoogle,
    })
    .then((response) => {
      console.log("local storage");
      localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    });
};

const login = (email, password) => {
  console.log("im here");
  return axios
    .post("https://floating-cliffs-13024.herokuapp.com/user/login", {
      email,
      password,
    })
    .then((response) => {
      console.log("local storage");
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    });
};

const loging = (email) => {
  console.log("im here");
  return axios
    .post("https://floating-cliffs-13024.herokuapp.com/user/loging", {
      email,
    })
    .then((response) => {
      console.log("local storage");
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    });
};

const UpdatePassword = (id, email, password, newpassword) => {
  console.log("updatin password first");
  return axios
    .post("https://floating-cliffs-13024.herokuapp.com/user/updatepassword", {
      id,
      email,
      password,
      newpassword,
    })
    .then((response) => {
      localStorage.removeItem("user");
      window.location.reload(false);
    });
};

const logout = () => {
  localStorage.removeItem("user");
  console.log("were loggin out");
};

export default {
  register,
  registerg,
  login,
  loging,
  logout,
  UpdatePassword,
};
