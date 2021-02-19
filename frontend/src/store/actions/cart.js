import authAxios from "../../axios";
import { CART_START, CART_SUCCESS, CART_FAIL } from "./actionTypes";
import { fetchOrder } from "./order";

import {
  addToCartURL,
  removeFromCartURL,
  deleteOrderProductURL,
  addCouponURL,
} from "../../constants";

// Cart Initialize
export const cartStart = () => {
  return {
    type: CART_START,
  };
};

// Cart Success
export const cartSuccess = () => {
  return {
    type: CART_SUCCESS,
  };
};

// Cart Error
export const cartFail = (error) => {
  return {
    type: CART_FAIL,
    error: error,
  };
};

// Add Item To Cart
export const cartAddItem = (id) => {
  return (dispatch) => {
    dispatch(cartStart());
    authAxios
      .post(addToCartURL, { id })
      .then((res) => {
        dispatch(cartSuccess());
        dispatch(fetchOrder(id));
      })
      .catch((err) => {
        dispatch(cartFail(err));
      });
  };
};

// Decrease Item Quantity From Cart
export const cartDeleteItem = (id) => {
  return (dispatch) => {
    dispatch(cartStart());
    authAxios
      .post(removeFromCartURL, { id })
      .then((res) => {
        dispatch(cartSuccess());
        dispatch(fetchOrder(id));
      })
      .catch((err) => {
        dispatch(cartFail(err));
      });
  };
};

// Delete Item From Cart
export const cartDeleteOrderItem = (id) => {
  return (dispatch) => {
    dispatch(cartStart());
    authAxios
      .delete(deleteOrderProductURL(id))
      .then((res) => {
        dispatch(cartSuccess());
        dispatch(fetchOrder(id));
      })
      .catch((err) => {
        dispatch(cartFail(err));
      });
  };
};

// Add Coupon To Cart
export const cartAddCoupon = (couponCode) => {
  return (dispatch) => {
    dispatch(cartStart());
    authAxios
      .post(addCouponURL, { couponCode })
      .then((res) => {
        dispatch(cartSuccess());
        dispatch(fetchOrder());
      })
      .catch((err) => {
        dispatch(cartFail(err));
      });
  };
};
