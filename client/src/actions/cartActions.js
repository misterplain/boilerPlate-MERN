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
} from "../constants/cartConstants";
import axios from "../api/axios";

//cart actions
const getCartItems = (token) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CARTITEMS_USER_REQUEST,
    });
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.get("/cart", options);

    dispatch({
      type: GET_CARTITEMS_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CARTITEMS_USER_FAIL,
      payload: error.message,
    });
  }
};

//add cart item user
const addCartItemUser =
  ({ token, productId, quantity, price, name }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADD_ITEM_USER_REQUEST,
      });
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await axios.post(
        `/cart/add/${productId}`,
        { quantity, price, name },
        options
      );

      dispatch({
        type: ADD_ITEM_USER_SUCCESS,
        payload: data,
      });
      return Promise.resolve();
    } catch (error) {
      dispatch({
        type: ADD_ITEM_USER_FAIL,
        payload: error.message,
      });
      return Promise.reject();
    }
  };

//add cart item guest
const addCartItemGuest =
  ({ productId, quantity, pricePerUnit, name }) =>
  async (dispatch, getState) => {
    try {
      const shoppingCartState = getState().shoppingCart;
      const { cartItems } = shoppingCartState;

      const itemIndex = cartItems.findIndex(
        (item) => item.product.toString() === productId.toString()
      );

      let newCartItem;
      if (itemIndex > -1) {
        newCartItem = {
          ...cartItems[itemIndex],
          quantity: cartItems[itemIndex].quantity + quantity,
          pricePerUnit: pricePerUnit,
          name: name,
        };
      } else {
        newCartItem = {
          product: productId,
          quantity: quantity,
          pricePerUnit: pricePerUnit,
          name: name,
        };
      }

      dispatch({
        type: ADD_ITEM_GUEST_SUCCESS,
        payload: newCartItem,
      });
      return Promise.resolve();
    } catch (error) {
      dispatch({
        type: ADD_ITEM_GUEST_FAIL,
        payload: error.message,
      });
      return Promise.reject();
    }
  };

//remove cart item user
const removeCartItemUser =
  ({ token, productId, quantity, price, name }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: REMOVE_ITEM_USER_REQUEST,
      });
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await axios({
        method: "delete",
        url: `/cart/delete/${productId}`,
        data: { quantity, price, name },
        headers: options.headers,
      });

      dispatch({
        type: REMOVE_ITEM_USER_SUCCESS,
        payload: data,
      });
      return Promise.resolve();
    } catch (error) {
      dispatch({
        type: REMOVE_ITEM_USER_FAIL,
        payload: error.message,
      });
      return Promise.reject();
    }
  };

//remove cart item guest
const removeCartItemGuest =
  ({ productId, quantity, pricePerUnit, name }) =>
  async (dispatch, getState) => {
    try {
      const shoppingCartState = getState().shoppingCart;
      const { cartItems } = shoppingCartState;

      const itemIndex = cartItems.findIndex(
        (item) => item.product.toString() === productId.toString()
      );

      if (itemIndex > -1) {
        const newQuantity = cartItems[itemIndex].quantity - quantity;

        if (newQuantity > 0) {
          dispatch({
            type: REMOVE_ITEM_GUEST_SUCCESS,
            payload: {
              product: productId,
              quantity: newQuantity,
              pricePerUnit: pricePerUnit,
              name: name,
            },
          });
          return Promise.resolve();
        } else {
          dispatch({
            type: REMOVE_ITEM_GUEST_SUCCESS,
            payload: {
              product: productId,
              quantity: 0,
              name: name,
            },
          });
          return Promise.resolve();
        }
      } else {
        dispatch({
          type: REMOVE_ITEM_GUEST_FAIL,
          payload: `Product with ID ${productId} not found in cart.`,
        });
        return Promise.reject();
      }
    } catch (error) {
      dispatch({
        type: REMOVE_ITEM_GUEST_FAIL,
        payload: error.message,
      });
      return Promise.reject();
    }
  };

export {
  getCartItems,
  addCartItemUser,
  addCartItemGuest,
  removeCartItemUser,
  removeCartItemGuest,
};
