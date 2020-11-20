import { GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAIL } from "./questions.types";
import axios from "axios";

export const getQuestions = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/questions/");

    dispatch({
      type: GET_QUESTIONS_SUCCESS,
      payload: res.data.questions,
    });
  } catch (e) {
    dispatch({
      type: GET_QUESTIONS_FAIL,
    });
  }
};
