import server from "../ServerPath";
import axios from "axios";
export const GET_PROJECT_DATA_FOR_LEADER_DASHBOARD =
  "GET_PROJECT_DATA_FOR_LEADER_DASHBOARD";

export const getProjectDetailsForLeaderDashboard = (data) => async (
  dispatch
) => {
  const response = await axios({
    method: "post",
    url: `${server}/getProjectDetailsForLeaderDashboard`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: GET_PROJECT_DATA_FOR_LEADER_DASHBOARD,
    payload: response.data,
  });
};
