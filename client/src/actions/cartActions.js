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
  EMPTY_CART,
} from "../constants/cartConstants";
import { useSelector } from "react-redux";
import { getState } from "react-redux";
import axios from "../api/axios";

//cart actions
const getCartItems = (token) => async (dispatch) => {
  try {
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
const addCartItemUser = ({token, productId, quantity}) => async (dispatch) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.post(
      `/cart/add/${productId}`,
      { quantity },
      options
    );

    dispatch({
      type: ADD_ITEM_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_USER_FAIL,
      payload: error.message,
    });
  }
};

//add cart item guest
const addCartItemGuest =
  (productId, quantity) => async (dispatch, getState) => {
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
        };
      } else {
        newCartItem = {
          product: productId,
          quantity: quantity,
        };
      }

      dispatch({
        type: ADD_ITEM_GUEST_SUCCESS,
        payload: newCartItem,
      });
    } catch (error) {
      dispatch({
        type: ADD_ITEM_GUEST_FAIL,
        payload: error.message,
      });
    }
  };

//remove cart item user
const removeCartItemUser = ({token, productId, quantity}) => async (dispatch) => {

    console.log({token, productId, quantity})
  try {
    const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    const data = await axios({
        method: 'delete',
        url: `/cart/delete/${productId}`,
        data: { quantity },
        headers: options.headers
      });

    dispatch({
      type: REMOVE_ITEM_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_ITEM_USER_FAIL,
      payload: error.message,
    });
  }
};

//remove cart item guest
const removeCartItemGuest =
  (productId, quantity) => async (dispatch, getState) => {
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
            },
          });
        } else {
          dispatch({
            type: REMOVE_ITEM_GUEST_SUCCESS,
            payload: {
              product: productId,
              quantity: 0,
            },
          });
        }
      } else {
        dispatch({
          type: REMOVE_ITEM_GUEST_FAIL,
          payload: `Product with ID ${productId} not found in cart.`,
        });
      }
    } catch (error) {
      dispatch({
        type: REMOVE_ITEM_GUEST_FAIL,
        payload: error.message,
      });
    }
  };

export {
  getCartItems,
  addCartItemUser,
  addCartItemGuest,
  removeCartItemUser,
  removeCartItemGuest,
};
