import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/authReducers";
import { userReducer } from "./reducers/userReducers";
// import { cartReducer } from "./reducers/cartReducers";
import { productListReducer } from "./reducers/productReducers";

const reducer = combineReducers({

  userAuth: authReducer,
  userDetails: userReducer,
  productList: productListReducer,
  // cartItems: cartReducer,
});

//cart items and token can be stored here in intial state
// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

//userInfo stored in local storage
// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

// const initialState = {
//   cart: {
//     cartItems: cartItemsFromStorage,
//     userLogin: { userInfo: userInfoFromStorage },
//   },
// };

const initialState = {};

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
