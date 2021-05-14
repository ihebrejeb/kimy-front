import axios from "axios";
import { FETCH_USER_SUCCESS, DELETE_USER, UPDATE_USER } from "./actionType";
import { Axios } from "../user/axiosfile.js";

const url = "http://http://floating-cliffs-13024.herokuapp.com//user/";

export const fetchUser = () => axios.get(url);

export function fetchUsers() {
  console.log("into fetch users");
  return (dispatch) => {
    Axios()
      .get("/user/")
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: FETCH_USER_SUCCESS,
          users: response.data,
        });
      })
      .catch((error) => {
        console.log("hello");
      });
  };
}

export function updateUser(_id, data) {
  console.log(_id);
  console.log(data);
  return (dispatch) => {
    Axios()
      .patch(`/user/${_id}`, data)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("we here");
        console.log(JSON.parse(localStorage.getItem("user")));
        console.log("repsones");
        console.log(response.data);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("notound");
      });
  };
}

export function deleteUser(_id) {
  console.log(_id);
  return (dispatch) => {
    Axios()
      .delete(`/user//${_id}`)
      .then((response) => {
        dispatch({
          type: DELETE_USER,
          id: _id,
        });
      });
  };
}
/* export function addContact(data) {
  return dispatch => {
   axios.post('/api/contactlist/add', data)
    .then(response =>{
      dispatch({
        type: ADD_CONTACT,
        contact:response.data
      })
    })

  }
}

export function editContact(_id) {
  return dispatch => {
   axios.get(`/api/contactlist/edit/${_id}`)
    .then(response =>{
      dispatch({
        type: EDIT_CONTACT,
        contact:response.data
      })
    })

  }
}

export function updateContact(_id, data) {
  console.log(_id);
  console.log(data);
  return dispatch => {
   axios.post(`/api/contactlist/update/${_id}`, data)
    .then(response =>{
      dispatch({
        type: UPDATE_CONTACT,
        contact:response.data
      })
    })

  }
}

export function deleteContact(_id) {
  console.log(_id);
  return dispatch => {
   axios.get(`/api/contactlist/delete/${_id}`)
    .then(response =>{
      dispatch({
        type: DELETE_CONTACT,
        id:_id,
      })
    })
  }
} */
