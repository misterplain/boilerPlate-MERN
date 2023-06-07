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
} from "../constants/cartConstants";
import axios from "../api/axios";

export const loginForm = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: FORM_LOGIN_REQUEST,
    });

    const data = await axios.post("/auth/signin", { email, password });
    console.log(data);

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
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: FORM_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const registerForm =
  (username, email, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({
        type: FORM_REGISTER_REQUEST,
      });

      const data = await axios.post("/auth/signup", {
        username,
        email,
        password,
        confirmPassword,
      });
      console.log(data);

      dispatch({
        type: FORM_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: SET_USER_DETAILS,
        payload: data.data.newUser,
      });
    } catch (error) {
      dispatch({
        type: FORM_REGISTER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const loginOAuth = (provider, code) => async (dispatch) => {
  const CLIENT_URL = "http://localhost:3000";
  try {
    dispatch({
      type: OAUTH_LOGIN_REQUEST,
    });
    console.log(provider);

    const oauthWindow = window.open(
      `http://localhost:5000/auth/${provider}`,
      "_blank"
    );

    window.addEventListener(
      "message",
      function (event) {
        if (event.origin !== "http://localhost:5000") {
          return;
        }
        // console.log(event.data.user);
        const { accessToken, refreshToken } = event.data;
        // console.log(`Received tokens: ${accessToken}, ${refreshToken}`);

        dispatch({
          type: OAUTH_LOGIN_SUCCESS,
          payload: { accessToken, refreshToken },
        });

        dispatch({
          type: SET_USER_DETAILS,
          payload: event.data.user,
        });

        dispatch({
          type: GET_CARTITEMS_USER_SUCCESS,
          payload: event.data.user,
        });

        oauthWindow.close();
      },
      false
    );
  } catch (error) {
    console.log(error);
    dispatch({
      type: OAUTH_LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGOUT,
    });
    window.open("http://localhost:5000/auth/logout", "_self");
    dispatch({
      type: CLEAR_USER_DETAILS,
    });

    dispatch({
      type: EMPTY_CART,
    })
  } catch (error) {
    console.log(error);
  }
};
