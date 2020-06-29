import axios from "axios";
import server from "../ServerPath";
export const ADD_TEAM = "ADD_TEAM";

export const createNewTeam = (data) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/createNewTeam`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: ADD_TEAM,
    payload: response.data,
  });
};
