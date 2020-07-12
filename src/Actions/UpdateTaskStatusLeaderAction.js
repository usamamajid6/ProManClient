import server from "../ServerPath";
import axios from "axios";
export const UPDATE_TASK_STATUS_LEADER = "UPDATE_TASK_STATUS_LEADER";

export const updateTaskStatusLeader = (data) => async (dispatch) => {
  const response = await axios({
    method: "put",
    url: `${server}/updateTaskStatusLeader`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: UPDATE_TASK_STATUS_LEADER,
    payload: response.data,
  });
};
