import { GET_PROJECT_DATA_FOR_LEADER_DASHBOARD } from "../Actions/LeaderDashboardDataAction";

const LeaderDashboardDataReducer = (state = null, action) => {
  switch (action.type) {
    case GET_PROJECT_DATA_FOR_LEADER_DASHBOARD:
      return action.payload;
    default: {
      return state;
    }
  }
};
export default LeaderDashboardDataReducer;
