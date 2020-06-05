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
