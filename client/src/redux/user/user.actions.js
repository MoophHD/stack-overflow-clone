import {
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
} from "./user.types";
import axios from "axios";
import { setAlert } from "../alert/alert.actions";

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });
    const res = await axios.get(`/api/users/${id}`);
    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data.user,
    });
  } catch (e) {
    setAlert(e.message, "danger");

    dispatch({
      type: GET_USER_FAILURE,
    });
  }
};
