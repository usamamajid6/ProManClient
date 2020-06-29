import axios from "axios";
export const LOGIN = "LOGIN";

export const loginUser = (loginDetails) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: "http://localhost:2222/loginUser",
    headers: {
      "content-type": "application/json",
    },
    data: loginDetails,
  });
  console.log(response);

  dispatch({
    type: LOGIN,
    payload: response.data,
  });
};
