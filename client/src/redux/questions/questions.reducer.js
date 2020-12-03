import {
  GET_QUESTION_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAIL,
  VOTE_QUESTION_SUCCESS,
  VOTE_ANSWER_SUCCESS,
  MARK_ANSWER_BEST,
  ADD_ANSWER_FAILURE,
  ADD_ANSWER_SUCCESS,
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
    case GET_QUESTION_REQUEST:
      return { ...state, loading: true };
    case SEARCH_QUESTION_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    case SEARCH_QUESTION_FAILURE:
      return { state, loading: false };
    case MARK_ANSWER_BEST: {
      const answers = state.question.answers;
      const updatedAnswer = action.payload;
      const id = updatedAnswer._id;

      const previousAnswer = answers.find((answer) => answer._id === id);
      return {
        ...state,
        question: {
          ...state.question,
          bestAnswer: id,
          answers: [
            ...answers.filter((answer) => answer._id !== id),
            {
              ...previousAnswer,
              ...updatedAnswer,
              author: {
                ...previousAnswer.author,
                score: updatedAnswer.author.score,
              },
            },
          ],
        },
      };
    }
    case ADD_ANSWER_SUCCESS:
      return {
        ...state,
        question: {
          ...state.question,
          answers: [...state.question.answers, action.payload],
        },
      };
    case ADD_ANSWER_FAILURE:
      return state;
    case VOTE_QUESTION_SUCCESS:
      return {
        ...state,
        question: {
          ...state.question,
          score: action.payload.score,
          votes: action.payload.votes,
          author: {
            ...state.question.author,
            score: action.payload.author.score,
          },
        },
      };
    case VOTE_ANSWER_SUCCESS: {
      const answers = state.question.answers;
      const updatedAnswer = action.payload;
      const id = updatedAnswer._id;

      const previousAnswer = answers.find((answer) => answer._id === id);
      return {
        ...state,
        question: {
          ...state.question,
          answers: [
            ...answers.filter((answer) => answer._id !== id),
            {
              ...previousAnswer,
              ...updatedAnswer,
              author: {
                ...previousAnswer.author,
                score: updatedAnswer.author.score,
              },
            },
          ],
        },
      };
    }
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
