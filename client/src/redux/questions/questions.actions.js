import {
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  GET_QUESTION_FAIL,
  GET_QUESTION_SUCCESS,
  VOTE_QUESTION_SUCCESS,
  VOTE_ANSWER_SUCCESS,
  VOTE_FAILED,
} from "./questions.types";
import axios from "axios";

export const upvoteQuestion = (questionId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/votes/upvote/${questionId}`);

    const question = res.data.result;
    dispatch({
      type: VOTE_QUESTION_SUCCESS,
      payload: question,
    });
  } catch (e) {
    dispatch({
      type: VOTE_FAILED,
    });
  }
};

export const downvoteQuestion = (questionId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/votes/downvote/${questionId}`);

    const question = res.data.result;
    dispatch({
      type: VOTE_QUESTION_SUCCESS,
      payload: question,
    });
  } catch (e) {
    dispatch({
      type: VOTE_FAILED,
    });
  }
};

export const upvoteAnswer = (questionId, answerId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/votes/upvote/${questionId}/${answerId}`);

    const answer = res.data.result;
    dispatch({
      type: VOTE_ANSWER_SUCCESS,
      payload: answer,
    });
  } catch (e) {
    dispatch({
      type: VOTE_FAILED,
    });
  }
};

export const downvoteAnswer = (questionId, answerId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/votes/upvote/${questionId}/${answerId}`);

    const answer = res.data.result;
    dispatch({
      type: VOTE_ANSWER_SUCCESS,
      payload: answer,
    });
  } catch (e) {
    dispatch({
      type: VOTE_FAILED,
    });
  }
};

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
