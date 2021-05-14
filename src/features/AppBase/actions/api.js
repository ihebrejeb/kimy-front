import axios from "axios";

const url = "http://floating-cliffs-13024.herokuapp.com/user/";

const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export function fetchUsers() {
  return (dispatch) => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: FETCH_USER_SUCCESS,
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export const fetchUser = () => axios.get(url);
export const CreateUser = (newUser) => axios.post(url, newUser);
export const UpdateUser = (id, updatedUser) =>
  axios.patch(`${url}/${id}`, updatedUser);
export const deleteUser = (id) => axios.delete(`${url}/${id}`);
