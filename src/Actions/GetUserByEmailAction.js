import server from "../ServerPath";
import axios from "axios";
export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL";

export const getUserByEmail = (data) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/getUserByEmail`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: GET_USER_BY_EMAIL,
    payload: response.data,
  });
};
