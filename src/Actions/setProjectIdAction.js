import axios from "axios";
import server from "../ServerPath";

export const SET_PROJECT_ID = "SET_PROJECT_ID";

export const setProjectId = (data) => {
  return {
    type: SET_PROJECT_ID,
    payload: data,
  };
};
