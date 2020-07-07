import server from "../ServerPath";
import axios from "axios";
export const ADD_TASK="ADD_TASK";

export const addTask = (addTaskDetails) => async (dispatch) => {
    const response = await axios({
      method: "post",
      url: `${server}/createNewTask`,
      headers: {
        "content-type": "application/json",
      },
      data: addTaskDetails,
    });
    dispatch({
      type: ADD_TASK,
      payload: response.data,
    });
  };