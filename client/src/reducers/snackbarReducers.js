import {
  ADD_SNACKBAR,
  REMOVE_SNACKBAR,
  SET_SNACKBAR_KEY,
} from "../constants/snackbarConstants";

const initialState = [];

export const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SNACKBAR:
      return [
        ...state,
        { ...action.payload, id: new Date().getTime(), key: null },
      ];
    case REMOVE_SNACKBAR:
      console.log(state)
      console.log(action)
      return state.filter((snackbar) => snackbar.key !== action.key);
    case SET_SNACKBAR_KEY:
      return state.map((snackbar) =>
        snackbar.id === action.id ? { ...snackbar, key: action.key } : snackbar
      );
    default:
      return state;
  }
};
