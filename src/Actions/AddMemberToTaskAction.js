import server from "../ServerPath";
import axios from "axios";
export const ADD_MEMBER_TO_TASK = "ADD_MEMBER_TO_TASK";

export const addMemberToTask = (data) => async (dispatch) => {
  const response = await axios({
    method: "put",
    url: `${server}/addMemberToTask`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: ADD_MEMBER_TO_TASK,
    payload: response.data,
  });
};
