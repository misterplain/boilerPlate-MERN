import {
  FORM_LOGIN_FAIL,
  FORM_LOGIN_REQUEST,
  FORM_LOGIN_SUCCESS,
  FORM_REGISTER_FAIL,
  FORM_REGISTER_REQUEST,
  FORM_REGISTER_SUCCESS,
  OAUTH_LOGIN_FAIL,
  OAUTH_LOGIN_REQUEST,
  OAUTH_LOGIN_SUCCESS,
  OAUTH_REGISTER_FAIL,
  OAUTH_REGISTER_REQUEST,
  OAUTH_REGISTER_SUCCESS,
  REFRESH_TOKEN,
  USER_LOGOUT,
} from "../constants/authConstants";
import {
  CLEAR_USER_DETAILS,
  SET_USER_DETAILS,
} from "../constants/userConstants";
import {
  GET_CARTITEMS_USER_FAIL,
  GET_CARTITEMS_USER_SUCCESS,
  EMPTY_CART,
  OAUTH_UPDATE_CART_FAIL,
  OAUTH_UPDATE_CART_SUCCESS,
} from "../constants/cartConstants";
import { CLEAR_ORDER } from "../constants/orderConstants";
import axios from "../api/axios";
const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-mern-api.onrender.com"
    : "http://localhost:5000";
const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-mern-eryu.onrender.com"
    : "http://localhost:3000";

export const loginForm = (email, password, cart) => async (dispatch) => {
  try {
    dispatch({
      type: FORM_LOGIN_REQUEST,
    });

    const data = await axios.post("/auth/signin", { email, password, cart });

    dispatch({
      type: FORM_LOGIN_SUCCESS,
      payload: data,
    });
    dispatch({
      type: SET_USER_DETAILS,
      payload: data.data.foundUser,
    });

    dispatch({
      type: GET_CARTITEMS_USER_SUCCESS,
      payload: data.data.foundUser,
    });
    dispatch({
      type: CLEAR_ORDER,
    });
  } catch (error) {
    dispatch({
      type: FORM_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const registerForm =
  (username, email, password, confirmPassword, cart) => async (dispatch) => {
    try {
      dispatch({
        type: FORM_REGISTER_REQUEST,
      });

      const data = await axios.post("/auth/signup", {
        username,
        email,
        password,
        confirmPassword,
        cart,
      });

      dispatch({
        type: FORM_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: SET_USER_DETAILS,
        payload: data.data.newUser,
      });
      dispatch({
        type: CLEAR_ORDER,
      });
    } catch (error) {
      dispatch({
        type: FORM_REGISTER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const loginOAuth = (provider, code) => async (dispatch) => {
  const CLIENT_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_SERVER_API_URL
      : "http://localhost:5000";

  console.log(provider);

  return new Promise((resolve, reject) => {
    try {
      dispatch({
        type: OAUTH_LOGIN_REQUEST,
      });

      const oauthWindow = window.open(
        `${CLIENT_URL}/auth/${provider}`,
        "_blank"
      );

      window.addEventListener(
        "message",
        function (event) {
          if (event.origin !== `${CLIENT_URL}`) {
            return;
          }

          const { accessToken, refreshToken } = event.data;

          dispatch({
            type: OAUTH_LOGIN_SUCCESS,
            payload: { accessToken, refreshToken },
          });

          dispatch({
            type: SET_USER_DETAILS,
            payload: event.data.user,
          });

          dispatch({
            type: CLEAR_ORDER,
          });

          oauthWindow.close();

          resolve({
            user: event.data.user,
            accessToken,
            refreshToken,
          });
        },
        false
      );
    } catch (error) {
      dispatch({
        type: OAUTH_LOGIN_FAIL,
        payload: error.message,
      });

      reject(error);
    }
  });
};

export const loginOAuthAndSyncCart = (provider, cart) => async (dispatch) => {
  try {
    const { user, accessToken, refreshToken } = await dispatch(
      loginOAuth(provider)
    );
    if (cart.length > 0) {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const data = await axios.post(
          "/cart/update",
          { cartItems: cart },
          options
        );
        dispatch({
          type: OAUTH_UPDATE_CART_SUCCESS,
          payload: data.data.cart,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: OAUTH_UPDATE_CART_FAIL,
          payload: error.response.data.message,
        });
      }
    } else {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const data = await axios.get("/cart/get", options);

        dispatch({
          type: OAUTH_UPDATE_CART_SUCCESS,
          payload: data.data.cart,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: OAUTH_UPDATE_CART_FAIL,
          payload: error.response.data.message,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGOUT,
    });
    window.open(SERVER_URL + "/auth/logout", "_self");
    dispatch({
      type: CLEAR_USER_DETAILS,
    });

    dispatch({
      type: EMPTY_CART,
    });
    dispatch({
      type: CLEAR_ORDER,
    });
  } catch (error) {
    console.log(error);
  }
};
