import { GET_PROJECT_DATA } from "../Actions/projectDataAction";

const projectDataReducer = (state = null, action) => {
  switch (action.type) {
    case GET_PROJECT_DATA:
      return action.payload;
    default: {
      return state;
    }
  }
};
export default projectDataReducer;
