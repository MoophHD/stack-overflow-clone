import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
} from "./auth.types";
import axios from "axios";

export const refreshToken = () => async (dispatch) => {
  try {
    const token = await axios.get("/api/auth/refreshToken");
    console.log(token);
    localStorage.token = token;
    dispatch({
      type: REFRESH_TOKEN_SUCCESS,
      payload: { token },
    });
  } catch (e) {
    dispatch({
      type: REFRESH_TOKEN_FAILURE,
    });
  }
};

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
