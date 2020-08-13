import { combineReducers } from "redux";
import counter from "./counterReducer";
import UUCW from "./UCPReducers/UUCWReducer";
import UAW from "./UCPReducers/UAWReducer";
import TCF from "./UCPReducers/TCFReducer";
import ECF from "./UCPReducers/ECFReducer";
import UCP from "./UCPReducers/UCPReducer";
import loginUser from "./LoginReducer";
import registerUser from "./RegisterReducer";
import userData from "./userDataReducer";
import addProject from "./addProjectReducer";
import addTeam from "./addTeamReducer";
import projectData from "./projectDataReducer";
import addTask from "./AddTaskReducer";
import addTaskList from "./AddTaskListReducer";
import projectId from "./setProjectIdReducer";
import addComment from "./addCommentReducer";
import taskData from "./TaskDataReducer";
import updateTaskStatus from "./UpdateTaskStatusReducer";
import updateTaskStatusLeader from "./UpdateTaskStatusReducerLeader";
import leaderDashboard from "./LeaderDashboardDataReducer";
import chatsMessages from "./ChatDataReducer";
import userByEmail from "./GetUserByEmailReducer";
import addMemberToTeam from "./AddMemberToTeamReducer";
import addMemberToProject from "./AddMemberToProjectReducer";
import addSubTask from "./AddSubTaskReducer";
import updateSubTaskStatus from "./UpdateSubTaskStatusReducer";
import subscribeTheTask from "./AddSubscribeReducer";
import unsubscribeTheTask from "./RemoveSubscribeReducer";
import verifyUser from "./VerifyUserReducer";
import updateUser from "./UpdateUserReducer";
import updateProject from "./UpdateProjectDataReducer";
import updateOrNotNavbar from "./UpdateOrNotNavbarReducer";
import getNotifications from "./GetNotificationsReducer";
import markNotificationsAsRead from "./MarkNotificationsAsReadReducer";
import updateTask from "./UpdateTaskReducer";
import addMemberToTask from './AddMemberToTaskReducer';
export default combineReducers({
  counter,
  UUCW,
  UAW,
  TCF,
  ECF,
  UCP,
  loginUser,
  registerUser,
  userData,
  addProject,
  addTeam,
  projectData,
  addTask,
  addTaskList,
  projectId,
  addComment,
  taskData,
  updateTaskStatus,
  updateTaskStatusLeader,
  leaderDashboard,
  chatsMessages,
  userByEmail,
  addMemberToTeam,
  addMemberToProject,
  addSubTask,
  updateSubTaskStatus,
  subscribeTheTask,
  unsubscribeTheTask,
  verifyUser,
  updateUser,
  updateProject,
  updateOrNotNavbar,
  getNotifications,
  markNotificationsAsRead,
  updateTask,
  addMemberToTask
});
