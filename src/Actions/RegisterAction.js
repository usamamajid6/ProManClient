import server from "../ServerPath";
import axios from "axios";
export const REGISTER = "REGISTER";

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
