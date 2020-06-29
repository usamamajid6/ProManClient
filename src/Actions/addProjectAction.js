import axios from "axios";
import server from "../ServerPath";
export const ADD_PROJECT = "ADD_PROJECT";

export const createNewProject = (data) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/createNewProject`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: ADD_PROJECT,
    payload: response.data,
  });
};
