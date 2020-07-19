import { UNSUBSCRIBE_TO_TASK } from "../Actions/RemoveSubscriberAction";

const RemoveSubscriberReducer = (state = null, action) => {
  switch (action.type) {
    case UNSUBSCRIBE_TO_TASK:
      return action.payload;
    default: {
      return state;
    }
  }
};

export default RemoveSubscriberReducer;
