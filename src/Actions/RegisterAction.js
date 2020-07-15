import server from "../ServerPath";
import axios from "axios";
export const REGISTER = "REGISTER";
export const REGISTER_GOOGLE_FB = "REGISTER_GOOGLE_FB";

export const registerUser = (userData) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/registerUser`,
    headers: {
      "content-type": "application/json",
    },
    data: userData,
  });
  console.log(response);

  dispatch({
    type: REGISTER,
    payload: response.data,
  });
};

export const registerUserGoogleFB = (userData) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/registerUserGoogleFB`,
    headers: {
      "content-type": "application/json",
    },
    data: userData,
  });
  console.log(response);

  dispatch({
    type: REGISTER_GOOGLE_FB,
    payload: response.data,
  });
};
