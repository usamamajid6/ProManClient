import server from "../ServerPath";
import axios from "axios";
export const SUBSCRIBE_TO_TASK = "SUBSCRIBE_TO_TASK";

export const subscribeTheTask = (data) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/addSubscriberToTask`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: SUBSCRIBE_TO_TASK,
    payload: response.data,
  });
};
