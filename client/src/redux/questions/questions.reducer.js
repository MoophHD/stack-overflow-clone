import {
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  SEARCH_QUESTION_SUCCESS,
  SEARCH_QUESTION_FAILURE,
  SET_QUESTION_COUNT,
  GET_QUESTIONS_REQUEST,
} from "./questions.types";

const initialState = {
  questions: {
    page: [],
    currentPage: 1,
    pageCount: 1,
    pageLimit: 3,
    questionCount: 0,
  },
  loading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTION_COUNT:
      return {
        ...state,
        questions: {
          ...state.questions,
          questionCount: action.payload,
          pageCount: Math.ceil(action.payload / state.questions.pageLimit),
        },
      };
    case SEARCH_QUESTION_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    case SEARCH_QUESTION_FAILURE:
      return { state, loading: false };
    case GET_QUESTIONS_REQUEST: {
      return { ...state, loading: true };
    }
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: {
          ...state.questions,
          page: action.payload.questions,
          currentPage: action.payload.page,
        },
        loading: false,
      };
    case GET_QUESTIONS_FAIL:
      return { ...state, questions: [], loading: false, question: null };
    default:
      return state;
  }
};

export default reducer;
