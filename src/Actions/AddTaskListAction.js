import server from "../ServerPath";
import axios from "axios";
export const ADD_TASKLIST="ADD_TASKLIST";

export const addTaskList = (addTaskListDetails) => async (dispatch) => {
    const response = await axios({
      method: "post",
      url: `${server}/createNewTaskList`,
      headers: {
        "content-type": "application/json",
      },
      data: addTaskListDetails,
    });
    dispatch({
      type: ADD_TASKLIST,
      payload: response.data,
    });
  };