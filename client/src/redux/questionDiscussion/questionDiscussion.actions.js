import {
  GET_QUESTION_REQUEST,
  GET_QUESTION_FAIL,
  GET_QUESTION_SUCCESS,
  VOTE_QUESTION_SUCCESS,
  VOTE_ANSWER_SUCCESS,
  VOTE_FAILED,
  ADD_ANSWER_SUCCESS,
  ADD_ANSWER_FAILURE,
  MARK_ANSWER_BEST,
  SET_ANSWER_COUNT,
  GET_ANSWERS_REQUEST,
  GET_ANSWERS_SUCCESS,
  GET_ANSWERS_FAIL,
  RESET_QUESTION,
  SET_ANSWERS_PAGE
} from "./questionDiscussion.types";
import axios from "axios";
import { setAlert } from "../alert/alert.actions";
import { checkAndRefreshToken } from "../auth/auth.actions";

const setAnswerCount = async (id) => {
  const res = await axios.get(`/api/answers/count/${id}`);

  return { type: SET_ANSWER_COUNT, payload: res.data.count };
};

export const resetQuestion = () => ({ type: RESET_QUESTION });

export const setAnswersPage = (page) => ({ type: SET_ANSWERS_PAGE, payload: page });

export const getAnswers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ANSWERS_REQUEST });

    const id = getState().questionDiscussion.question._id;
    const pageLimit = getState().questionDiscussion.answers.pageLimit;
    const page = getState().questionDiscussion.answers.currentPage;
    const res = await axios.get(`/api/answers/${id}`, {
      params: { page, pageLimit },
    });

    dispatch({
      type: GET_ANSWERS_SUCCESS,
      payload: { answers: res.data.answers, page },
    });
  } catch (e) {
    dispatch(setAlert(e.message, "danger"));

    dispatch({
      type: GET_ANSWERS_FAIL,
    });
  }
};

export const getQuestion = (id) => async (dispatch) => {
  try {
    dispatch(await setAnswerCount(id));

    dispatch({ type: GET_QUESTION_REQUEST });
    const res = await axios.get(`/api/questions/${id}`);

    dispatch({
      type: GET_QUESTION_SUCCESS,
      payload: res.data.question,
    });
  } catch (e) {
    dispatch(setAlert(e.message, "danger"));
    dispatch({
      type: GET_QUESTION_FAIL,
    });
  }
};

export const markAnswerBest = (questionId, answerId) => async (
  dispatch,
  getState
) => {
  try {
    await checkAndRefreshToken()(dispatch, getState);

    const res = await axios.get(
      `/api/questions/pick-answer/${questionId}/${answerId}`
    );

    dispatch({
      type: MARK_ANSWER_BEST,
      payload: res.data.answer,
    });
  } catch (e) {
    dispatch(setAlert(e.message, "danger"));

    dispatch({
      type: VOTE_FAILED,
    });
  }
};

export const addAnswer = (questionId, text) => async (dispatch, getState) => {
  try {
    await checkAndRefreshToken()(dispatch, getState);

    const res = await axios.post(`/api/answers/`, { questionId, text });
    dispatch({
      type: ADD_ANSWER_SUCCESS,
      payload: res.data.answer,
    });
  } catch (e) {
    dispatch(setAlert(e.message, "danger"));

    dispatch({
      type: ADD_ANSWER_FAILURE,
    });
  }
};

export const upvoteQuestion = (questionId) => async (dispatch, getState) => {
  try {
    await checkAndRefreshToken()(dispatch, getState);

    const res = await axios.get(`/api/votes/upvote/${questionId}`);

    dispatch({
      type: VOTE_QUESTION_SUCCESS,
      payload: res.data.target,
    });
  } catch (e) {
    dispatch(setAlert(e.message, "danger"));

    dispatch({
      type: VOTE_FAILED,
    });
  }
};

export const downvoteQuestion = (questionId) => async (dispatch, getState) => {
  try {
    await checkAndRefreshToken()(dispatch, getState);

    const res = await axios.get(`/api/votes/downvote/${questionId}`);

    const question = res.data.target;
    dispatch({
      type: VOTE_QUESTION_SUCCESS,
      payload: question,
    });
  } catch (e) {
    dispatch(setAlert(e.message, "danger"));

    dispatch({
      type: VOTE_FAILED,
    });
  }
};

export const upvoteAnswer = (questionId, answerId) => async (
  dispatch,
  getState
) => {
  try {
    await checkAndRefreshToken()(dispatch, getState);

    const res = await axios.get(`/api/votes/upvote/${questionId}/${answerId}`);

    const answer = res.data.target;
    dispatch({
      type: VOTE_ANSWER_SUCCESS,
      payload: answer,
    });
  } catch (e) {
    dispatch(setAlert(e.message, "danger"));

    dispatch({
      type: VOTE_FAILED,
    });
  }
};

export const downvoteAnswer = (questionId, answerId) => async (
  dispatch,
  getState
) => {
  try {
    await checkAndRefreshToken()(dispatch, getState);

    const res = await axios.get(
      `/api/votes/downvote/${questionId}/${answerId}`
    );

    const answer = res.data.target;
    dispatch({
      type: VOTE_ANSWER_SUCCESS,
      payload: answer,
    });
  } catch (e) {
    dispatch(setAlert(e.message, "danger"));

    dispatch({
      type: VOTE_FAILED,
    });
  }
};
