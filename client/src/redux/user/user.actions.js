import { GET_USER } from "./user.types";
import axios from "axios";

export const getUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${id}`);
    dispatch({
      type: GET_USER,
      payload: res.data.user,
    });
  } catch (e) {
    console.log(e.response);
  }
};
