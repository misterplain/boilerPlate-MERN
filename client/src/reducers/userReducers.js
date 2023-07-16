import {
  SET_USER_DETAILS,
  CLEAR_USER_DETAILS,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,
  REMOVE_ADDRESS_SUCCESS,
  REMOVE_ADDRESS_FAIL,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAIL,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  EDIT_ORDER_SUCCESS,
  EDIT_ORDER_FAIL,
  UPDATE_FAVORITE_SUCCESS,
  UPDATE_FAVORITE_FAIL,
} from "../constants/userConstants";

export const userReducer = (state = { isGuest: true }, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: {
          username: action.payload.username,
          userId: action.payload._id,
          email: action.payload.email,
          isAdmin: action.payload.isAdmin,
          isGuest: false,
          addresses: action.payload.addresses,
          favorites: action.payload.favorites,
        },
        isGuest: false,
        orderHistory: action.payload.orders,
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
        isGuest: true,
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

    case FETCH_USER_ORDERS_SUCCESS:
      return { ...state, orderHistory: action.payload };

    case FETCH_USER_ORDERS_FAIL:
      return { ...state, error: action.payload };
    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        orderHistory: state.orderHistory.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };

    case EDIT_ORDER_SUCCESS:
      return {
        ...state,
        orderHistory: state.orderHistory.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };
    case EDIT_ORDER_FAIL:
      return {
        ...state,
        error: action.payload.message,
      };

    case UPDATE_FAVORITE_SUCCESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          favorites: action.payload,
        },
      };
    case UPDATE_FAVORITE_FAIL:
      return {
        ...state,
        error: action.payload.message,
      };
    default:
      return state;
  }
};
