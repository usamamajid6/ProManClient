export const INCREAMENT = "INCREAMENT";
export const DECREAMENT = "DECREAMENT";

export const increaseNumber = (valToIncrease) => {
  return {
    type: INCREAMENT,
    payload: valToIncrease,
  };
};

export const decreaseNumber = (valToDecrease) => {
  return {
    type: DECREAMENT,
    payload: valToDecrease,
  };
};

// UCP Actions

// UUCW Actions

export const SAVE_UUCW_RESULT = "SAVE_UUCW_RESULT";
export const UUCW_RESULT_STATUS = "UUCW_RESULT_STATUS";

export const saveUUCWResult = (result) => {
  return {
    type: SAVE_UUCW_RESULT,
    payload: result,
  };
};

export const changeUUCWResultStatus = (status) => {
  return {
    type: UUCW_RESULT_STATUS,
    payload: status,
  };
};

// UAW Actions

export const SAVE_UAW_RESULT = "SAVE_UAW_RESULT";
export const UAW_RESULT_STATUS = "UAW_RESULT_STATUS";

export const saveUAWResult = (result) => {
  return {
    type: SAVE_UAW_RESULT,
    payload: result,
  };
};

export const changeUAWResultStatus = (status) => {
  return {
    type: UAW_RESULT_STATUS,
    payload: status,
  };
};

// TCF Actions

export const SAVE_TCF_RESULT = "SAVE_TCF_RESULT";
export const TCF_RESULT_STATUS = "TCF_RESULT_STATUS";

export const saveTCFResult = (result) => {
  return {
    type: SAVE_TCF_RESULT,
    payload: result,
  };
};

export const changeTCFResultStatus = (status) => {
  return {
    type: TCF_RESULT_STATUS,
    payload: status,
  };
};

// ECF Actions

export const SAVE_ECF_RESULT = "SAVE_ECF_RESULT";
export const ECF_RESULT_STATUS = "ECF_RESULT_STATUS";

export const saveECFResult = (result) => {
  return {
    type: SAVE_ECF_RESULT,
    payload: result,
  };
};

export const changeECFResultStatus = (status) => {
  return {
    type: ECF_RESULT_STATUS,
    payload: status,
  };
};

// UCP Calculation Actions

export const SAVE_UCP_RESULT = "SAVE_UCP_RESULT";
export const UCP_RESULT_STATUS = "UCP_RESULT_STATUS";

export const saveUCPResult = (result) => {
  return {
    type: SAVE_UCP_RESULT,
    payload: result,
  };
};

export const changeUCPResultStatus = (status) => {
  return {
    type: UCP_RESULT_STATUS,
    payload: status,
  };
};

// UCP Calculation Per UCP Cost Actions

export const SAVE_UCP_COST_RESULT = "SAVE_UCP_COST_RESULT";
export const UCP_COST_RESULT_STATUS = "UCP_COST_RESULT_STATUS";

export const saveUCPCostResult = (result) => {
  return {
    type: SAVE_UCP_COST_RESULT,
    payload: result,
  };
};

export const changeUCPCostResultStatus = (status) => {
  return {
    type: UCP_COST_RESULT_STATUS,
    payload: status,
  };
};
