import {
  CHECKOUT_START,
  CHECKOUT_SUCCESS,
  PAYMENT_SUCCESS,
  CHECKOUT_FAIL,
} from "../actions/actionTypes";
import { updateState } from "./utility";

const initialState = {
  success: false,
  loading: false,
  error: null,
};

// Checkout Initialize
export const checkoutStart = (state, action) => {
  return updateState(state, {
    loading: true,
    error: null,
  });
};

// Checkout Success
export const checkoutSuccess = (state, action) => {
  return updateState(state, {
    loading: false,
    success: false,
    error: null,
  });
};

// Payment Success
export const paymentSuccess = (state, action) => {
  return updateState(state, {
    loading: false,
    success: true,
  });
};

// Checkout Error
export const checkoutFail = (state, action) => {
  return updateState(state, {
    loading: false,
    success: false,
    error: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_START:
      return checkoutStart(state, action);
    case CHECKOUT_SUCCESS:
      return checkoutSuccess(state, action);
    case PAYMENT_SUCCESS:
      return paymentSuccess(state, action);
    case CHECKOUT_FAIL:
      return checkoutFail(state, action);
    default:
      return state;
  }
};

export default reducer;
