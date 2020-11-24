import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAIL,
  CHECK_TOKEN_SUCCESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from "./auth.types";
import axios from "axios";
import { push } from "connected-react-router";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth/load-user/");

    dispatch({ type: LOAD_USER_SUCCESS, payload: res.data.user });
  } catch (e) {
    dispatch({ type: LOAD_USER_FAIL });
  }
};

export const checkAndRefreshToken = () => async (dispatch, getState) => {
  try {
    const previousToken = getState().auth.token;
    const resCheckToken = await axios.get(
      "/api/auth/checkToken/" + previousToken
    );
    if (resCheckToken.data.isValid) {
      dispatch({ type: CHECK_TOKEN_SUCCESS });
      return;
    }

    const res = await axios.get("/api/auth/refreshToken");
    const token = res.data.token;

    dispatch({
      type: REFRESH_TOKEN_SUCCESS,
      payload: { token },
    });
  } catch (e) {
    dispatch(push("/auth"));

    dispatch({
      type: REFRESH_TOKEN_FAIL,
    });
  }
};

export const register = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/register", data);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (e) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/login", data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (e) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
