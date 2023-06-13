import {
  ADD_ITEM_GUEST_FAIL,
  ADD_ITEM_GUEST_SUCCESS,
  ADD_ITEM_USER_FAIL,
  ADD_ITEM_USER_SUCCESS,
  REMOVE_ITEM_GUEST_FAIL,
  REMOVE_ITEM_GUEST_SUCCESS,
  REMOVE_ITEM_USER_FAIL,
  REMOVE_ITEM_USER_SUCCESS,
  GET_CARTITEMS_USER_SUCCESS,
  GET_CARTITEMS_USER_FAIL,
  OAUTH_UPDATE_CART_FAIL,
  OAUTH_UPDATE_CART_SUCCESS,
  EMPTY_CART,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case GET_CARTITEMS_USER_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cart,
      };

    case ADD_ITEM_USER_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.data.cart,
      };

    case ADD_ITEM_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case REMOVE_ITEM_USER_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.data.cart,
      };
    case REMOVE_ITEM_USER_FAIL:
      return {
        ...state,
        error: action.payload,
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
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
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
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) =>
              item.product.toString() !== action.payload.product.toString()
          ),
        };
      }
    case REMOVE_ITEM_GUEST_FAIL:
      return {
        ...state,
        error: action.payload,
      };
  }
  return state;
};
