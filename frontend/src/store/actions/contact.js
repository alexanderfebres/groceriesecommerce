import { MESSAGE_START, MESSAGE_SUCCESS, MESSAGE_FAIL } from "./actionTypes";
import { leaveMessageURL } from "../../constants";
import authAxios from "../../axios";

// Email Start
export const messageStart = () => {
  return {
    type: MESSAGE_START,
  };
};

// Email Sent
export const messageSuccess = () => {
  return {
    type: MESSAGE_SUCCESS,
  };
};

// Email Failed
export const messageFail = (error) => {
  return {
    type: MESSAGE_FAIL,
    error: error,
  };
};

// Leave message
export const leaveMessage = (email, message, name) => {
  return (dispatch) => {
    dispatch(messageStart());
    authAxios
      .post(leaveMessageURL, { email, message, name })
      .then((res) => {
        dispatch(messageSuccess());
      })
      .catch((err) => {
        dispatch(messageFail(err));
      });
  };
};
