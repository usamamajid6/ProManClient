import { UPDATE_OR_NOT_NAVBAR } from "../Actions/UpdateOrNotNavbarAction";

const updateOrNotNavbarReducer = (state = false, action) => {
  switch (action.type) {
    case UPDATE_OR_NOT_NAVBAR:
      return action.payload;
    default:
      return state;
  }
};

export default updateOrNotNavbarReducer;
