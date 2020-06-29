import axios from "axios";
import server from "../ServerPath";

export const GET_USER_DATA = "GET_USER_DATA";
export const SAVE_USER_DATA = "SAVE_USER_DATA";
export const REMOVE_USER_DATA = "REMOVE_USER_DATA";

const data = {
  data: {
    result: {
      total_tasks: 0,
      efficiency_score: 0,
      _id: 1,
      name: "a",
      email: "a",
      password: "$2a$10$cO.LQJRDG.q2Z9lkF9plX.8BYoG52DwV0Fy5MJgLnZnrZrzx/AbZ2",
      phone_number: "76522478324",
      __v: 0,
    },
    projects: [
      {
        status: "in-progress",
        cost: "Sorry No Information Provided",
        timelines: [],
        _id: 1,
        name: "Project B",
        start_date: "2020-02-01T19:00:00.000Z",
        end_date: "2020-03-31T19:00:00.000Z",
        project_type: "other",
        leader: 3,
        members: [
          {
            total_tasks: 0,
            efficiency_score: 0,
            _id: 1,
            member: 1,
          },
        ],
        createdAt: "2020-06-26T13:28:11.894Z",
        updatedAt: "2020-06-26T13:28:12.393Z",
        __v: 0,
      },
      {
        status: "in-progress",
        cost: "Sorry No Information Provided",
        timelines: [],
        _id: 2,
        name: "Project B",
        start_date: "2020-02-01T19:00:00.000Z",
        end_date: "2020-03-31T19:00:00.000Z",
        project_type: "other",
        leader: 3,
        members: [
          {
            total_tasks: 0,
            efficiency_score: 0,
            _id: 1,
            member: 1,
          },
          {
            total_tasks: 0,
            efficiency_score: 0,
            _id: 2,
            member: 2,
          },
          {
            total_tasks: 0,
            efficiency_score: 0,
            _id: 1,
            member: 1,
          },
          {
            total_tasks: 0,
            efficiency_score: 0,
            _id: 2,
            member: 2,
          },
          {
            total_tasks: 0,
            efficiency_score: 0,
            _id: 3,
            member: 3,
          },
        ],
        createdAt: "2020-06-26T13:30:21.358Z",
        updatedAt: "2020-06-26T13:30:21.398Z",
        __v: 0,
      },
    ],
    teams: [
      {
        name: "Tean A",
        description: "GFG YG ghas hgas hgja sdaugd djhgjsd sjhs saJHAS lsa",
        members: [1, 2, 1, 2, 3, 4],
        projects: [1, 2],
        _id: 1,
        leader: 1,
        __v: 0,
      },
    ],
  },
};

export const getUserData = (data) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: `${server}/getUserById`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
  dispatch({
    type: GET_USER_DATA,
    payload: response.data,
  });
};
export const saveUserData = () => {
  return {
    type: SAVE_USER_DATA,
  };
};
export const removeUserData = () => {
  return {
    type: REMOVE_USER_DATA,
  };
};
