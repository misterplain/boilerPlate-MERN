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

export const authReducer = (state = { accessToken: null }, action) => {
  switch (action.type) {
    case FORM_LOGIN_REQUEST:
      return { loading: true };

    case FORM_LOGIN_SUCCESS:
      localStorage.setItem("profile", action.payload.data.refreshToken);
      return {
        loading: false,
        authenticated: true,
        accessToken: action.payload.data.accessToken,
        refreshToken: action.payload.data.refreshToken,
        errors: null,
      };

    case FORM_LOGIN_FAIL:
      return { loading: false, error: action.payload, authenticated: false };
    case OAUTH_LOGIN_REQUEST:
      return { loading: true };

    case OAUTH_LOGIN_SUCCESS:
      localStorage.setItem("profile", action.payload.refreshToken);
      return {
        loading: false,
        authenticated: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        errors: null,
      };

    case OAUTH_LOGIN_FAIL:
      return { loading: false, error: action.payload, authenticated: false };

    //register
    case FORM_REGISTER_REQUEST:
      return { loading: true };

    case FORM_REGISTER_SUCCESS:
      localStorage.setItem("profile", action.payload.data.refreshToken);
      return {
        accessToken: action.payload.data.accessToken,
        refreshToken: action.payload.data.refreshToken,
        authenticated: true,
        loading: false,
        errors: null,
      };
    case FORM_REGISTER_FAIL:
      return { loading: false, error: action.payload, authenticated: false };

    case OAUTH_REGISTER_FAIL:
      return { loading: false, error: action.payload, authenticated: false };
    case FORM_REGISTER_REQUEST:
      return { loading: true };

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

    //LOGOUT AND REFRESH TOKEN
    case USER_LOGOUT:
      localStorage.removeItem("profile");
      return {
        ...state,
        authenticated: false,
        accessToken: null,
        refreshToken: null,
      };

    case REFRESH_TOKEN:
      return {
        ...state,
        accessToken: action.payload.data.accessToken,
        refreshToken: action.payload.data.refreshToken,
      };
    default:
      return state;
  }
};
