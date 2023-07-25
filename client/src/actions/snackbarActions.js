import {
  ADD_SNACKBAR,
  REMOVE_SNACKBAR,
  SET_SNACKBAR_KEY,
} from "../constants/snackbarConstants";

export const addSnackbar = (message, severity) => ({
  type: ADD_SNACKBAR,
  payload: { message, severity },
});

export const removeSnackbar = (key) => ({
  type: REMOVE_SNACKBAR,
  key,
});

export const setSnackbarKey = (id, key) => ({
  type: SET_SNACKBAR_KEY,
  id,
  key,
});
