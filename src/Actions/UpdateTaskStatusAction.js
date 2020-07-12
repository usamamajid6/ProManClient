import server from "../ServerPath";
import axios from "axios";
export const UPDATE_TASK_STATUS = "UPDATE_TASK_STATUS";

export const updateTaskStatus = (data) => async (dispatch) => {
  const response = await axios({
    method: "put",
    url: `${server}/updateTaskStatus`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: UPDATE_TASK_STATUS,
    payload: response.data,
  });
};
