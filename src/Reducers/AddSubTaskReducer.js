import { ADD_SUB_TASK } from "../Actions/AddSubTaskAction";

const AddTaskReducer = (state = null, action) => {
  switch (action.type) {
    case ADD_SUB_TASK:
      return action.payload;
    default: {
      return state;
    }
  }
};

export default AddTaskReducer;
