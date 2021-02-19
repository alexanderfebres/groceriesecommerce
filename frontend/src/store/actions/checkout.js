import {
  CHECKOUT_START,
  CHECKOUT_SUCCESS,
  PAYMENT_SUCCESS,
  CHECKOUT_FAIL,
} from "./actionTypes";
import authAxios from "../../axios";
import { checkoutURL, paymentURL } from "../../constants";

// Checkout Initialize
export const checkoutStart = () => {
  return {
    type: CHECKOUT_START,
  };
};

// Checkout Success
export const checkoutSuccess = () => {
  return {
    type: CHECKOUT_SUCCESS,
  };
};

// Payment Success
export const paymentSuccess = () => {
  return {
    type: PAYMENT_SUCCESS,
  };
};

// Checkout Error
export const checkoutFail = (error) => {
  return {
    type: CHECKOUT_FAIL,
  };
};

// Proccess Checkout
export const checkout = (billingDetails) => {
  return (dispatch) => {
    dispatch(checkoutStart());
    authAxios
      .post(checkoutURL, { billingDetails })
      .then((res) => {
        dispatch(checkoutSuccess());
      })
      .catch((err) => {
        dispatch(checkoutFail(err));
      });
  };
};

// Proccess Payment
export const processPayment = (token) => {
  return (dispatch) => {
    dispatch(checkoutStart());
    authAxios
      .post(paymentURL, { token })
      .then((res) => {
        dispatch(paymentSuccess());
      })
      .catch((err) => {
        dispatch(checkoutFail(err));
      });
  };
};
