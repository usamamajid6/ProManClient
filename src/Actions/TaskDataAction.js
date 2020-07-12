import axios from "axios";
import server from "../ServerPath";

export const GET_TASK_DATA = "GET_TASK_DATA";

export const getTaskData = (data) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/getTaskById`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: GET_TASK_DATA,
    payload: response.data,
  });
};
