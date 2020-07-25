import server from "../ServerPath";
import axios from "axios";
export const UPDATE_USER = "UPDATE_USER";

export const updateUser = (data) => async (dispatch) => {
  const response = await axios({
    method: "put",
    url: `${server}/updateUser`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: UPDATE_USER,
    payload: response.data,
  });
};
