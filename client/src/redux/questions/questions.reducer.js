import {
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  SET_QUESTION_COUNT,
  GET_QUESTIONS_REQUEST,
  RESET_QUESTIONS,
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
    case RESET_QUESTIONS:
      return initialState;
    case SET_QUESTION_COUNT:
      return {
        ...state,
        questions: {
          ...state.questions,
          questionCount: action.payload,
          pageCount: Math.ceil(action.payload / state.questions.pageLimit),
        },
      };
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
