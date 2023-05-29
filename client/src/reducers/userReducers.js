import {
  SET_USER_DETAILS,
  CLEAR_USER_DETAILS,
} from "../constants/userConstants";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      
      return {
        ...state,
        // userDetails: action.payload,

        userDetails: {
          username: action.payload.username,
          email: action.payload.email,
          isAdmin: action.payload.isAdmin,
          isGuest: false,
        },
      };
    case CLEAR_USER_DETAILS:
      return {
        ...state,
        userDetails: {
          username: null,
          email: null,
          isAdmin: null,
          isGuest: true,
        },
      };
    default:
      return state;
  }
};
