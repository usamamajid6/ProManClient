import server from "../ServerPath";
import axios from "axios";
export const GET_PROJECT_DATA = "GET_PROJECT_DATA";

export const getProjectData = (data) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/getProjectData`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: GET_PROJECT_DATA,
    payload: response.data,
  });
};
