import axios from "axios";
import server from "../ServerPath";

export const GET_USER_DATA = "GET_USER_DATA";
export const SAVE_USER_DATA = "SAVE_USER_DATA";
export const REMOVE_USER_DATA = "REMOVE_USER_DATA";


export const getUserData = (data) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/getUserById`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: GET_USER_DATA,
    payload: response.data,
  });
};
export const saveUserData = (data) => {
  return {
    type: SAVE_USER_DATA,
    payload: data,
  };
};
export const removeUserData = () => {
  return {
    type: REMOVE_USER_DATA,
  };
};
