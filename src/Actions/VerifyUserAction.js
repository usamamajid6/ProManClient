import server from "../ServerPath";
import axios from "axios";
export const VERIFY_USER = "VERIFY_USER";

export const verifyUser = (data) => async (dispatch) => {
  const response = await axios({
    method: "put",
    url: `${server}/verifyUser`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: VERIFY_USER,
    payload: response.data,
  });
};
