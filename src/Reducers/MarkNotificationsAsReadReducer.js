import { MARK_NOTIFICATIONS_AS_READ } from "../Actions/MarkNotificationsAsReadAction";

const MarkNotificationsAsReadReducer = (state = null, action) => {
  switch (action.type) {
    case MARK_NOTIFICATIONS_AS_READ:
      return action.payload;
    default: {
      return state;
    }
  }
};
export default MarkNotificationsAsReadReducer;
