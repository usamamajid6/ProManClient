import { combineReducers } from "redux";

import counter from "./counterReducer";
import UUCW from "./UCPReducers/UUCWReducer";
import UAW from "./UCPReducers/UAWReducer";
import TCF from "./UCPReducers/TCFReducer";
import ECF from "./UCPReducers/ECFReducer";
import UCP from "./UCPReducers/UCPReducer";

export default combineReducers({
  counter,
  UUCW,
  UAW,
  TCF,
  ECF,
  UCP,
});
