export const UPDATE_OR_NOT_NAVBAR = "UPDATE_OR_NOT_NAVBAR";

export const updateOrNotNavbar = (data) => {
  return {
    type: UPDATE_OR_NOT_NAVBAR,
    payload: data,
  };
};
