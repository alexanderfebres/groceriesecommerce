import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/auth";
import orderReducer from "./reducers/order";
import productReducer from "./reducers/product";
import checkoutReducer from "./reducers/checkout";
import cartReducer from "./reducers/cart";
import blogReducer from "./reducers/blog";
import contactReducer from "./reducers/contact";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  product: productReducer,
  checkout: checkoutReducer,
  cart: cartReducer,
  blog: blogReducer,
  contact: contactReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhances(applyMiddleware(thunk))
);
