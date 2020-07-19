import { SUBSCRIBE_TO_TASK } from "../Actions/AddSubscriberAction";

const AddSubscriberReducer = (state = null, action) => {
  switch (action.type) {
    case SUBSCRIBE_TO_TASK:
      return action.payload;
    default: {
      return state;
    }
  }
};

export default AddSubscriberReducer;
