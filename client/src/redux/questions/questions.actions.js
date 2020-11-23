import {
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  GET_QUESTION_FAIL,
  GET_QUESTION_SUCCESS,
} from "./questions.types";
import axios from "axios";

export const getQuestion = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/questions/${id}`);

    dispatch({
      type: GET_QUESTION_SUCCESS,
      payload: res.data.question,
    });
  } catch (e) {
    dispatch({
      type: GET_QUESTION_FAIL,
    });
  }
};

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
