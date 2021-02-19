import {
  ORDER_START,
  ORDER_SUCCESS,
  ORDER_FAIL,
  GET_ORDER_TOTAL,
} from "../actions/actionTypes";
import { updateState } from "./utility";

const initialState = {
  order: {},
  loading: false,
  error: null,
  orderTotal: 0,
};

// Order Initialize
const orderStart = (state) => {
  return updateState(state, {
    loading: true,
    error: null,
  });
};

// Fetch Order Success
const orderSuccess = (state, action) => {
  return updateState(state, {
    order: action.order,
    loading: false,
  });
};

// Order Error
const orderFail = (state, action) => {
  return updateState(state, {
    error: action.error,
    loading: false,
  });
};

// Get Order Total Price Success
const getOrderTotal = (state, action) => {
  return updateState(state, {
    orderTotal: action.orderTotal,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_START:
      return orderStart(state, action);
    case ORDER_SUCCESS:
      return orderSuccess(state, action);
    case ORDER_FAIL:
      return orderFail(state, action);
    case GET_ORDER_TOTAL:
      return getOrderTotal(state, action);
    default:
      return state;
  }
};

export default reducer;
