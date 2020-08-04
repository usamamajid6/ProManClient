import server from "../ServerPath";
import axios from "axios";
export const MARK_NOTIFICATIONS_AS_READ = "MARK_NOTIFICATIONS_AS_READ";

export const markNotificationsAsRead = (data) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/markNotificationsAsRead`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: MARK_NOTIFICATIONS_AS_READ,
    payload: response.data,
  });
};
