import {
  FETCH_USER_SUCCESS,
  ADD_USER,
  UPDATE_USER,
  EDIT_USER,
  DELETE_USER,
} from '../actions/actionType';

const initialState = {
  users: [],
  error: null
}
export default function userslist(state = initialState, action) {
   switch (action.type) {
     case FETCH_USER_SUCCESS:
        return {
          ...state,
          users: action.users.data
        };

      case ADD_USER:
         return {
           ...state,
            users: [...state.users, action.user.data]
         };

       case EDIT_USER:
          return {
            ...state,
             user: action.user.data
          };
      case UPDATE_USER:
         return {
           ...state,
            user:  action.user.data
         };

     case DELETE_USER:
        return {
          ...state,
          users: state.users.filter(user => user._id !== action.id)
        };

      default:
       return state;
   }
}
