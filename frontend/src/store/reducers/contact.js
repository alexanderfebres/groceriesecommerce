import {
  MESSAGE_START,
  MESSAGE_SUCCESS,
  MESSAGE_FAIL,
} from "../actions/actionTypes";
import { updateState } from "./utility";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const messageStart = (state, action) => {
  return updateState(state, {
    loading: true,
  });
};

export const messageSuccess = (state, action) => {
  return updateState(state, {
    loading: false,
    success: true,
  });
};

export const messageFail = (state, action) => {
  return updateState(state, {
    error: action.error,
    success: false,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_START:
      return messageStart(state, action);
    case MESSAGE_SUCCESS:
      return messageSuccess(state, action);
    case MESSAGE_FAIL:
      return messageFail(state, action);
    default:
      return state;
  }
};

export default reducer;
