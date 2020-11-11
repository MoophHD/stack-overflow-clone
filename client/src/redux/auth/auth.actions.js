import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./auth.types";

export const register = (data) => async (dispatch) => {
  try {
    const body = JSON.stringify(data);
    const resData = await fetch("/api/auth/register", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then((data) => data);

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
    const body = JSON.stringify(data);
    const resData = await fetch("/api/auth/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then((data) => data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: resData,
    });
  } catch (e) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
