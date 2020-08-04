import server from "../ServerPath";
import axios from "axios";
export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";

export const getNotifications = (data) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/getNotificationsByMemberId`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: GET_NOTIFICATIONS,
    payload: response.data,
  });
};
