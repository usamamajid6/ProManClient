import server from "../ServerPath";
import axios from "axios";
export const UNSUBSCRIBE_TO_TASK = "UNSUBSCRIBE_TO_TASK";

export const unsubscribeTheTask = (data) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/removeSubscriberToTask`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: UNSUBSCRIBE_TO_TASK,
    payload: response.data,
  });
};
