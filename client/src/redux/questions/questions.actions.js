import {
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  SEARCH_QUESTION_SUCCESS,
  SEARCH_QUESTION_FAILURE,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_FAILURE,
} from "./questions.types";
import axios from "axios";
import { push } from "connected-react-router";
import { setAlert } from "../alert/alert.actions";
import { checkAndRefreshToken } from "../auth/auth.actions";

export const createQuestion = (title, text, tags) => async (
  dispatch,
  getState
) => {
  try {
    await checkAndRefreshToken()(dispatch, getState);
    const res = await axios.post("/api/questions", { title, text, tags });

    dispatch({
      type: CREATE_QUESTION_SUCCESS,
      payload: res.data.questions,
    });

    dispatch(push("/"));
  } catch (e) {
    dispatch(setAlert(e.message, "danger"));

    dispatch({
      type: CREATE_QUESTION_FAILURE,
    });
  }
};

export const searchQuestion = (words, tags) => async (dispatch) => {
  try {
    dispatch({ type: GET_QUESTIONS_REQUEST });

    let res;
    if (words.length > 0 || tags.length > 0) {
      const query = {};

      if (words.length > 0) query.title = words.join("+");
      if (tags.length > 0) query.tags = tags.join("+");

      res = await axios.get(`/api/questions/search/`, { params: query });
    } else {
      res = await axios.get("/api/questions/");
    }

    dispatch({
      type: SEARCH_QUESTION_SUCCESS,
      payload: res.data.questions,
    });
  } catch (e) {
    dispatch(setAlert(e.message, "danger"));

    dispatch({
      type: SEARCH_QUESTION_FAILURE,
    });
  }
};

export const getQuestions = () => async (dispatch) => {
  try {
    dispatch({ type: GET_QUESTIONS_REQUEST });
    const res = await axios.get("/api/questions/");

    dispatch({
      type: GET_QUESTIONS_SUCCESS,
      payload: res.data.questions,
    });
  } catch (e) {
    dispatch(setAlert(e.message, "danger"));

    dispatch({
      type: GET_QUESTIONS_FAIL,
    });
  }
};
