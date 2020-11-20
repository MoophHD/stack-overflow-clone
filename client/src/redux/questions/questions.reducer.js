import { GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAIL } from "./questions.types";

const initialState = {
  questions: [],
  loading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS_SUCCESS:
      return { ...state, questions: action.payload, loading: false };
    case GET_QUESTIONS_FAIL:
      return { ...state, questions: [], loading: false };
    default:
      return state;
  }
};

export default reducer;
