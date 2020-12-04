import {
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  SEARCH_QUESTION_SUCCESS,
  SEARCH_QUESTION_FAILURE,
} from "./questions.types";

const initialState = {
  questions: [],
  question: null,
  loading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_QUESTION_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    case SEARCH_QUESTION_FAILURE:
      return { state, loading: false };
    case GET_QUESTIONS_SUCCESS:
      return { ...state, questions: action.payload, loading: false };
    case GET_QUESTIONS_FAIL:
      return { ...state, questions: [], loading: false, question: null };
    default:
      return state;
  }
};

export default reducer;
