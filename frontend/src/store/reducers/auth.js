import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from "../actions/actionTypes";

import { updateState } from "./utility";

const initialState = {
  token: null,
  error: null,
  loading: false,
};

// Auth Initialize
const authStart = (state, action) => {
  return updateState(state, {
    error: null,
    loading: true,
  });
};

// Authentication Succeeded
const authSuccess = (state, action) => {
  return updateState(state, {
    token: action.token,
    error: null,
    loading: false,
  });
};

// Auth Error
const authFail = (state, action) => {
  return updateState(state, {
    error: action.error,
    loading: false,
  });
};

// Logout
const authLogout = (state, action) => {
  return updateState(state, {
    token: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
