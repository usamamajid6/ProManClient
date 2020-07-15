import server from "../ServerPath";
import axios from "axios";
export const GET_CHATS_MESSAGES = "GET_CHATS_MESSAGES";

export const getChatsByProjectId = (data) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/getChatsByProjectId`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: GET_CHATS_MESSAGES,
    payload: response.data,
  });
};
