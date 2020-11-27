import {
  GET_QUESTION_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAIL,
  VOTE_QUESTION_SUCCESS,
  VOTE_ANSWER_SUCCESS,
  MARK_ANSWER_BEST,
  VOTE_FAILED,
  ADD_ANSWER_FAILURE,
  ADD_ANSWER_SUCCESS,
  SEARCH_QUESTION_SUCCESS,
  SEARCH_QUESTION_FAILURE,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_FAILURE,
  FILTER_TAGS_FAILURE,
  FILTER_TAGS_SUCCESS,
} from "./questions.types";

const initialState = {
  questions: [],
  question: null,
  loading: true,
};

const reducer = (state = initialState, action) => {
  const question = state.question;
  let updatedAnswer, previousAnswer, id, answers;

  switch (action.type) {
    case FILTER_TAGS_SUCCESS:
      return { ...state, questions: action.payload, loading: false };
    case FILTER_TAGS_FAILURE:
      return { ...state, loading: false };
    case GET_QUESTION_REQUEST:
      return { ...state, loading: true };
    case CREATE_QUESTION_SUCCESS:
    case CREATE_QUESTION_FAILURE:
      return state;
    case SEARCH_QUESTION_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    case SEARCH_QUESTION_FAILURE:
      return { state, loading: false };
    case MARK_ANSWER_BEST:
      answers = question.answers;
      updatedAnswer = action.payload;
      id = updatedAnswer._id;

      previousAnswer = answers.find((answer) => answer._id === id);
      return {
        ...state,
        question: {
          ...question,
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
        },
      };
    case VOTE_ANSWER_SUCCESS:
      answers = question.answers;
      updatedAnswer = action.payload;
      id = updatedAnswer._id;

      previousAnswer = answers.find((answer) => answer._id === id);
      return {
        ...state,
        question: {
          ...question,
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
    case VOTE_FAILED:
      return state;
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
