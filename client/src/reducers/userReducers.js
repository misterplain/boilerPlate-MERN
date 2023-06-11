import {
  SET_USER_DETAILS,
  CLEAR_USER_DETAILS,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,
  REMOVE_ADDRESS_SUCCESS,
  REMOVE_ADDRESS_FAIL,
} from "../constants/userConstants";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: {
          username: action.payload.username,
          email: action.payload.email,
          isAdmin: action.payload.isAdmin,
          isGuest: false,
          addresses: action.payload.addresses,
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
          addresses: [],
        },
      };

    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          addresses: [
            ...state.userDetails.addresses,
            action.payload.data.newAddress,
          ],
        },
      };

    case ADD_ADDRESS_FAIL:
      return {
        ...state,
        error: action.payload.data.message,
      };

    case REMOVE_ADDRESS_SUCCESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          addresses: state.userDetails.addresses.filter(
            (address) => address._id !== action.payload.data.addressToDelete._id
          ),
        },
      };

    case REMOVE_ADDRESS_FAIL:
      return {
        ...state,
        error: action.payload.data.message,
      };
    default:
      return state;
  }
};
