import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_FAILURE,
} from "./auth.types";
import axios from "axios";
import setAuthToken from "./auth.utils";

export const checkAndRefreshToken = () => async (dispatch) => {
  try {
    const resCheckToken = await axios.get("/api/auth/checkToken");
    if (resCheckToken.data.isValid) {
      dispatch({ type: CHECK_TOKEN_SUCCESS });
      return;
    }

    const res = await axios.get("/api/auth/refreshToken");
    const token = res.data.token;
    setAuthToken(token);

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
    setAuthToken(resData.data.token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: resData.data,
    });
  } catch (e) {
    console.log(e.response.data);
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const resData = await axios.post("/api/auth/login", data);
    setAuthToken(resData.data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: resData.data,
    });
  } catch (e) {
    console.log(e.response.data);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
