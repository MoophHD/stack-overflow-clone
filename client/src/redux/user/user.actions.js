import { GET_USER_SUCCESS, GET_USER_FAILURE } from "./user.types";
import axios from "axios";

export const getUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${id}`);
    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data.user,
    });
  } catch (e) {
    dispatch({
      type: GET_USER_FAILURE,
    });
  }
};
