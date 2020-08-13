import server from "../ServerPath";
import axios from "axios";
export const UPDATE_TASK = "UPDATE_TASK";

export const updateTask = (data) => async (dispatch) => {
  const response = await axios({
    method: "put",
    url: `${server}/updateTask`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: UPDATE_TASK,
    payload: response.data,
  });
};
