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
});
