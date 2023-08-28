import {
  SET_USER_DETAILS,
  CLEAR_USER_DETAILS,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,
  REMOVE_ADDRESS_SUCCESS,
  REMOVE_ADDRESS_FAIL,
  UPDATE_FAVORITE_REQUEST,
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
      const isDefaultAdded = action.payload.data.newAddress.isDefault;

      const updatedAddresses = isDefaultAdded
        ? state.userDetails.addresses.map((address) => ({
            ...address,
            isDefault: false,
          }))
        : [...state.userDetails.addresses];

      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          addresses: [...updatedAddresses, action.payload.data.newAddress],
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
    case UPDATE_FAVORITE_REQUEST:
      return {
        ...state,
        loading: true,
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
