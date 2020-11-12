import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./auth.types";
import axios from "axios";

export const register = (data) => async (dispatch) => {
  try {
    const resData = await axios.post("/api/auth/register", data);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: resData,
    });
  } catch (e) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const resData = await axios.post("/api/auth/login", data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: resData,
    });
  } catch (e) {
    console.log(e.response.data);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
