import server from "../ServerPath";
import axios from "axios";
export const ADD_SUB_TASK="ADD_SUB_TASK";

export const addSubTask = (addSubTaskDetails) => async (dispatch) => {
    const response = await axios({
      method: "post",
      url: `${server}/createNewSubTask`,
      headers: {
        "content-type": "application/json",
      },
      data: addSubTaskDetails,
    });
    dispatch({
      type: ADD_SUB_TASK,
      payload: response.data,
    });
  };