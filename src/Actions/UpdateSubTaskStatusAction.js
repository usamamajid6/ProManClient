import server from "../ServerPath";
import axios from "axios";
export const UPDATE_SUB_TASK_STATUS = "UPDATE_SUB_TASK_STATUS";

export const updateSubTaskStatus = (data) => async (dispatch) => {
  const response = await axios({
    method: "put",
    url: `${server}/updateSubTaskStatus`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: UPDATE_SUB_TASK_STATUS,
    payload: response.data,
  });
};
