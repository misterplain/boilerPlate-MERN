import {
  ADD_ITEM_GUEST_FAIL,
  ADD_ITEM_GUEST_SUCCESS,
  ADD_ITEM_USER_REQUEST,
  ADD_ITEM_USER_FAIL,
  ADD_ITEM_USER_SUCCESS,
  REMOVE_ITEM_GUEST_FAIL,
  REMOVE_ITEM_GUEST_SUCCESS,
  REMOVE_ITEM_USER_REQUEST,
  REMOVE_ITEM_USER_FAIL,
  REMOVE_ITEM_USER_SUCCESS,
  GET_CARTITEMS_USER_REQUEST,
  GET_CARTITEMS_USER_SUCCESS,
  GET_CARTITEMS_USER_FAIL,
  OAUTH_UPDATE_CART_REQUEST,
  OAUTH_UPDATE_CART_FAIL,
  OAUTH_UPDATE_CART_SUCCESS,
  EMPTY_CART,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case GET_CARTITEMS_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CARTITEMS_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        cartItems: action.payload.cart,
      };
    case GET_CARTITEMS_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_ITEM_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_ITEM_USER_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.data.cart,
        loading: false,
        error: null,

      };

    case ADD_ITEM_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case REMOVE_ITEM_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REMOVE_ITEM_USER_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.data.cart,
        error: null,
        loading: false,
      };
    case REMOVE_ITEM_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    //guest
    case ADD_ITEM_GUEST_SUCCESS:
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product.toString() === action.payload.product.toString()
      );

      if (itemIndex > -1) {
        return {
          ...state,
          cartItems: state.cartItems.map((item, index) =>
            index === itemIndex ? action.payload : item
          ),
          error: null,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
          error: null,
        };
      }
    case ADD_ITEM_GUEST_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case REMOVE_ITEM_GUEST_SUCCESS:
      if (action.payload.quantity > 0) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product.toString() === action.payload.product.toString()
              ? action.payload
              : item
          ),
          error: null,
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) =>
              item.product.toString() !== action.payload.product.toString()
          ),
          error: null,
        };
      }
    case REMOVE_ITEM_GUEST_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case OAUTH_UPDATE_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case OAUTH_UPDATE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        cartItems: action.payload,
      };
    case OAUTH_UPDATE_CART_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };
  }
  return state;
};
