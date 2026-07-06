import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/authReducers";
import { userReducer } from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import { productListReducer } from "./reducers/productReducers";
import { collectionsReducer } from "./reducers/collectionsReducers";
import { orderReducer } from "./reducers/userOrderReducers";
import { reviewsReducer } from "./reducers/reviewsReducers";
import { orderHistoryReducer } from "./reducers/orderHistoryReducers";
import { shopReducer } from "./reducers/shopReducers";

const reducer = combineReducers({
  userAuth: authReducer,
  userDetails: userReducer,
  collections: collectionsReducer,
  productList: productListReducer,
  shoppingCart: cartReducer,
  userOrder: orderReducer,
  reviews: reviewsReducer,
  orderHistory: orderHistoryReducer,
  shop: shopReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
