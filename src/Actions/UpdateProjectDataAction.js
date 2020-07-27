import server from "../ServerPath";
import axios from "axios";
export const UPDATE_PROJECT_DATA = "UPDATE_PROJECT_DATA";

export const updateProjectData = (data) => async (dispatch) => {
  const response = await axios({
    method: "put",
    url: `${server}/updateProjectData`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: UPDATE_PROJECT_DATA,
    payload: response.data,
  });
};
