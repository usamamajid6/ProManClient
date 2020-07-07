import { ADD_TASKLIST } from "../Actions/AddTaskListAction";

const AddTaskListReducer=(state=null, action)=>{
    switch (action.type) {
        case ADD_TASKLIST:
          return action.payload;
        default: {
          return state;
        }
      }
}

export default AddTaskListReducer;