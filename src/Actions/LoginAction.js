import server from "../ServerPath";
import axios from "axios";
export const LOGIN = "LOGIN";
export const LOGIN_GOOGLE_FB = "LOGIN_GOOGLE_FB";

export const loginUser = (loginDetails) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/loginUser`,
    headers: {
      "content-type": "application/json",
    },
    data: loginDetails,
  });
  dispatch({
    type: LOGIN,
    payload: response.data,
  });
};

export const loginUserGoogleFB = (loginDetails) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/loginUserGoogleFB`,
    headers: {
      "content-type": "application/json",
    },
    data: loginDetails,
  });
  dispatch({
    type: LOGIN_GOOGLE_FB,
    payload: response.data,
  });
};
