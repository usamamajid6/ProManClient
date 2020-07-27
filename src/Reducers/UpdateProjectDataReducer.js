import { UPDATE_PROJECT_DATA } from "../Actions/UpdateProjectDataAction";

const initialState = {
  data: {},
};

const updateProjectData = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROJECT_DATA:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default updateProjectData;
