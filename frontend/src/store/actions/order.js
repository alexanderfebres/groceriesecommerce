import {
  ORDER_START,
  ORDER_SUCCESS,
  ORDER_FAIL,
  GET_ORDER_TOTAL,
} from "./actionTypes";
import authAxios from "../../axios";
import { setProductQuantity } from "./product";
import { orderSummaryURL } from "../../constants";

// Order Initialize
export const orderStart = () => {
  return {
    type: ORDER_START,
  };
};

// Fetch Order Success
export const orderSuccess = (order) => {
  return {
    type: ORDER_SUCCESS,
    order: order,
  };
};

// Order Error
export const orderFail = (error) => {
  return {
    type: ORDER_FAIL,
    error: error,
  };
};

// Calculeta Order Total Price
const calculateTotal = (order) => {
  let orderTotal = 0;
  const coupon = order.coupon;
  order.items.map((item) => {
    if (item.product.discount_price) {
      orderTotal += item.product.discount_price * item.quantity;
    } else {
      orderTotal += item.product.price * item.quantity;
    }
  });
  return coupon ? orderTotal - coupon.amount : orderTotal;
};

// Get Order Total Price Success
export const getOrderTotal = (order) => {
  const orderTotal = calculateTotal(order);
  return {
    type: GET_ORDER_TOTAL,
    orderTotal: orderTotal,
  };
};

// Fetch Order
export const fetchOrder = (id) => {
  return (dispatch) => {
    dispatch(orderStart());
    authAxios
      .get(orderSummaryURL)
      .then((res) => {
        const order = res.data.order;
        const items = res.data.order.items;
        dispatch(orderSuccess(order));
        dispatch(getOrderTotal(order));
        dispatch(setProductQuantity(id, items));
      })
      .catch((err) => {
        const error = "You do not have an active order";
        dispatch(orderFail(error));
      });
  };
};
