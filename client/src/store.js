import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/authReducers";
import { userReducer } from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import { productListReducer } from "./reducers/productReducers";
import { collectionsReducer } from "./reducers/collectionsReducers";
import { orderReducer } from "./reducers/userOrderReducers";
import { reviewsReducer } from "./reducers/reviewsReducers";
// import { ordersReducer } from "./reducers/adminOrdersReducers";
import { orderHistoryReducer } from "./reducers/orderHistoryReducers";

const reducer = combineReducers({
  userAuth: authReducer,
  userDetails: userReducer,
  collections: collectionsReducer,
  productList: productListReducer,
  shoppingCart: cartReducer,
  userOrder: orderReducer,
  reviews: reviewsReducer,
  orderHistory: orderHistoryReducer,
  // adminOrders: ordersReducer,
});

const initialState = {};

const middleware = [thunk];

// if (process.env.NODE_ENV === "development") {
//   middleware.push(logger);
// }

middleware.push(logger);

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
