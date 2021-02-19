import axios from "axios";
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from "./actionTypes";
import { loginURL, signupURL } from "../../constants";

// Auth Initialize
export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

// Authorization succeeded
export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
  };
};

// Auth Error
export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT,
  };
};

// Check timeout
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

// Login
export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(loginURL, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        const error =
          "Invalid email or password were provided. Please verify your credentials and try again";
        dispatch(authFail(error));
      });
  };
};

// Register Account
export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(signupURL, {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        if (password1 !== password2) {
          const error = "Passwords do not match";
          dispatch(authFail(error));
        } else if (password1.length < 6 && password2.length < 6) {
          const error = "Your password must contain at least 6 digits";
          dispatch(authFail(error));
        } else {
          const error = "Email or Username already taken";
          dispatch(authFail(error));
        }
      });
  };
};

// Check State
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
