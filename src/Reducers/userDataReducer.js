import {
  GET_USER_DATA,
  SAVE_USER_DATA,
  REMOVE_USER_DATA,
} from "../Actions/userDataAction";

const state = {
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
        name: "Abacus Project",
        start_date: "2020-02-01T19:00:00.000Z",
        end_date: "2020-03-31T19:00:00.000Z",
        project_type: "other",
        leader: 3,
        description:
          "GFG YG ghas hgas hgja sdaugd djhgjsd sjhs saJHAS lsa GFG YG ghas hgas hgja sdaugd djhgjsd sjhs saJHAS lsa GFG YG ghas hgas hgja sdaugd djhgjsd sjhs saJHAS lsa GFG YG ghas hgas hgja sdaugd djhgjsd sjhs saJHAS lsa GFG YG ghas hgas hgja sdaugd djhgjsd sjhs saJHAS lsa v",
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
        name: "Big Project",
        start_date: "2020-02-01T19:00:00.000Z",
        end_date: "2020-03-31T19:00:00.000Z",
        project_type: "other",
        leader: 3,
        description: "GFG YG ghas hgas hgja sdaugd djhgjsd sjhs saJHAS lsa ",
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
      {
        status: "in-progress",
        cost: "Sorry No Information Provided",
        timelines: [],
        _id: 2,
        name: "C",
        start_date: "2020-02-01T19:00:00.000Z",
        end_date: "2020-03-31T19:00:00.000Z",
        project_type: "other",
        leader: 3,
        description: "GFG YG ghas hgas hgja sdaugd djhgjsd sjhs saJHAS lsa ",
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
      {
        status: "in-progress",
        cost: "Sorry No Information Provided",
        timelines: [],
        _id: 2,
        name: "D",
        start_date: "2020-02-01T19:00:00.000Z",
        end_date: "2020-03-31T19:00:00.000Z",
        project_type: "other",
        leader: 3,
        description: "GFG YG ghas hgas hgja sdaugd djhgjsd sjhs saJHAS lsa ",
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
      {
        status: "in-progress",
        cost: "Sorry No Information Provided",
        timelines: [],
        _id: 2,
        name: "E",
        start_date: "2020-02-01T19:00:00.000Z",
        end_date: "2020-03-31T19:00:00.000Z",
        project_type: "other",
        leader: 3,
        description: "GFG YG ghas hgas hgja sdaugd djhgjsd sjhs saJHAS lsa ",
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
        name: "Team A",
        description: "GFG YG ghas hgas hgja sdaugd djhgjsd sjhs saJHAS lsa",
        members: [1, 2, 1, 2, 3, 4],
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
        _id: 1,
        leader: 1,
        __v: 0,
      },
      {
        name: "Team B",
        description: "GFG YG ghas hgas hgja sdaugd djhgjsd sjhs saJHAS lsa",
        members: [1, 2, 1, 2, 3, 4],
        projects: [
          {
            status: "in-progress",
            cost: "Sorry No Information Provided",
            timelines: [],
            _id: 1,
            name: "Project B Team B",
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
        _id: 2,
        leader: 1,
        __v: 0,
      },
    ],
  },
};

const initialState = {
  data: state.data,
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        data: action.payload.data,
      };
    case SAVE_USER_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case REMOVE_USER_DATA:
      return {
        ...state,
        data: {},
      };
    default:
      return state;
  }
};

export default userDataReducer;
