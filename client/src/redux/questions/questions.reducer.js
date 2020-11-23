import {
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAIL,
} from "./questions.types";

const initialState = {
  questions: [],
  question: null,
  loading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTION_SUCCESS:
      return { ...state, question: action.payload, loading: false };
    case GET_QUESTIONS_SUCCESS:
      return { ...state, questions: action.payload, loading: false };
    case GET_QUESTIONS_FAIL:
    case GET_QUESTION_FAIL:
      return { ...state, questions: [], loading: false, question: null };
    default:
      return state;
  }
};

export default reducer;
