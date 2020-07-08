import { ADD_COMMENT } from "../Actions/addCommentAction";

const addCommentReducer=(state=null, action)=>{
    switch (action.type) {
        case ADD_COMMENT:
          return action.payload;
        default: 
          return state; 
      }
}

export default addCommentReducer;