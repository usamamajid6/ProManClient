import server from "../ServerPath";
import axios from "axios";
export const ADD_COMMENT="ADD_COMMENT";

export const addComment = (data) => async (dispatch) => {
    const response = await axios({
      method: "post",
      url: `${server}/createNewComment`,
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
    console.log(response);
    
    dispatch({
      type: ADD_COMMENT,
      payload: response.data,
    });
  };