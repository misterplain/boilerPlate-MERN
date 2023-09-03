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
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAIL,
  USER_LOGOUT,
} from "../constants/authConstants";

export const authReducer = (state = { accessToken: null }, action) => {
  switch (action.type) {
    case FORM_LOGIN_REQUEST:
      return { loading: true, loginError: null };

    case FORM_LOGIN_SUCCESS:
      localStorage.setItem("profile", action.payload.data.refreshToken);
      return {
        loading: false,
        authenticated: true,
        accessToken: action.payload.data.accessToken,
        refreshToken: action.payload.data.refreshToken,
        loginError: null,
      };

    case FORM_LOGIN_FAIL:
      return {
        loading: false,
        loginError: action.payload,
        registerError: null,
        authenticated: false,
      };

    case OAUTH_LOGIN_REQUEST:
      return { loading: true, error: null };

    case OAUTH_LOGIN_SUCCESS:
      localStorage.setItem("profile", action.payload.refreshToken);
      return {
        loading: false,
        authenticated: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        error: null,
      };

    case OAUTH_LOGIN_FAIL:
      return { loading: false, error: action.payload, authenticated: false };

    case FORM_REGISTER_REQUEST:
      return { loading: true, registerError: null };

    case FORM_REGISTER_SUCCESS:
      localStorage.setItem("profile", action.payload.data.refreshToken);
      return {
        accessToken: action.payload.data.accessToken,
        refreshToken: action.payload.data.refreshToken,
        authenticated: true,
        loading: false,
        registerError: null,
      };

    case FORM_REGISTER_FAIL:
      return {
        loading: false,
        registerError: action.payload,
        loginError: null,
        authenticated: false,
      };

    case OAUTH_REGISTER_REQUEST:
      return { loading: true, error: null };

    case OAUTH_REGISTER_SUCCESS:
      localStorage.setItem("profile", action.payload.refreshToken);
      return {
        authenticated: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        loading: false,
        errors: null,
      };

    case OAUTH_REGISTER_FAIL:
      return { loading: false, error: action.payload, authenticated: false };

    case USER_LOGOUT:
      localStorage.removeItem("profile");
      return {
        ...state,
        authenticated: false,
        accessToken: null,
        refreshToken: null,
      };

    case REFRESH_TOKEN_REQUEST:
      return { ...state, loading: true };

    case REFRESH_TOKEN_SUCCESS:
      console.log(action)
      localStorage.setItem("profile", action.payload.refreshToken);
      return {
        ...state,
        authenticated: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case REFRESH_TOKEN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
