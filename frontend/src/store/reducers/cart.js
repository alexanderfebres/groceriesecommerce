import { CART_START, CART_SUCCESS, CART_FAIL } from "../actions/actionTypes";
import { updateState } from "./utility";

const initialState = {
  loading: false,
  error: null,
};

// Cart Initialize
export const cartStart = (state, action) => {
  return updateState(state, {
    loading: true,
    error: null,
  });
};

// Cart Success
export const cartSuccess = (state, action) => {
  return updateState(state, {
    loading: false,
  });
};

// Cart Error
export const cartFail = (state, action) => {
  return updateState(state, {
    loading: false,
    error: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_START:
      return cartStart(state, action);
    case CART_SUCCESS:
      return cartSuccess(state, action);
    case CART_FAIL:
      return cartFail(state, action);
    default:
      return state;
  }
};

export default reducer;
