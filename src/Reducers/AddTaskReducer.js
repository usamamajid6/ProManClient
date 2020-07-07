import { ADD_TASK } from "../Actions/AddTaskAction";

const AddTaskReducer=(state=null, action)=>{
    switch (action.type) {
        case ADD_TASK:
          return action.payload;
        default: {
          return state;
        }
      }
}

export default AddTaskReducer;