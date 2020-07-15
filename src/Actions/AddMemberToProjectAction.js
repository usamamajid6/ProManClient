import server from "../ServerPath";
import axios from "axios";
export const ADD_MEMBER_TO_PROJECT = "ADD_MEMBER_TO_PROJECT";

export const addMemberToProject = (data) => async (dispatch) => {
  const response = await axios({
    method: "put",
    url: `${server}/addMemberToProject`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: ADD_MEMBER_TO_PROJECT,
    payload: response.data,
  });
};
