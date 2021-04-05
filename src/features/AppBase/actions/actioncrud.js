import axios from 'axios';
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  ADD_USER,
  EDIT_USER,
  UPDATE_USER,
  DELETE_USER,
} from './actionType';

const url = 'http://localhost:4000/user/'

export const fetchUser =  () =>   axios.get(url);

export function fetchUsers() {
  console.log("hellz");
  return dispatch =>{
      axios.get('http://localhost:4000/user/')
      .then( (response)=> {
        console.log(response.data);
        dispatch({
          type:FETCH_USER_SUCCESS,
          users:response.data
        })

      })
      .catch((error)=> {
        console.log("hello");
      });

  }
}

export function deleteUser(_id) {
  console.log(_id);
  return dispatch => {
    axios.delete(`http://localhost:4000/user//${_id}`)
    .then(response =>{
      dispatch({
        type: DELETE_USER,
        id:_id,
      })
    })
  }
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
