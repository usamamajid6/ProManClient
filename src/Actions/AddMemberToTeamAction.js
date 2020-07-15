import server from "../ServerPath";
import axios from "axios";
export const ADD_MEMBER_TO_TEAM = "ADD_MEMBER_TO_TEAM";

export const addMemberToTeam = (data) => async (dispatch) => {
  const response = await axios({
    method: "put",
    url: `${server}/addMultipleMemberToTeam`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: ADD_MEMBER_TO_TEAM,
    payload: response.data,
  });
};
