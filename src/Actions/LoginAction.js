import server from "../ServerPath";
import axios from "axios";
export const LOGIN = "LOGIN";

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
