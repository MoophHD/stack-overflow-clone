import {
  GET_QUESTION_REQUEST,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAIL,
  VOTE_QUESTION_SUCCESS,
  VOTE_ANSWER_SUCCESS,
  MARK_ANSWER_BEST,
  ADD_ANSWER_SUCCESS,
  SET_ANSWER_COUNT,
  GET_ANSWERS_FAIL,
  GET_ANSWERS_REQUEST,
  GET_ANSWERS_SUCCESS,
} from "./questionDiscussion.types";

const initialState = {
  question: null,
  loading: true,

  answers: {
    page: [],
    currentPage: 1,
    pageCount: 1,
    pageLimit: 3,
    answerCount: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ANSWER_COUNT:
      return {
        ...state,
        answers: {
          ...state.answers,
          page: [],
          currentPage: 1,
          answerCount: action.payload,
          pageCount: ~~(action.payload / state.answers.pageLimit),
        },
      };
    case GET_ANSWERS_REQUEST:
      return { ...state, answers: { ...state.answers, loading: true } };
    case GET_ANSWERS_SUCCESS:
      return {
        ...state,
        answers: {
          ...state.answers,
          page: action.payload.answers,
          currentPage: action.payload.page,
          loading: false,
        },
      };
    case GET_ANSWERS_FAIL:
      return { ...state, answers: { ...state.answers, loading: false } };
    case GET_QUESTION_REQUEST:
      return { ...state, loading: true };
    case GET_QUESTION_SUCCESS:
      return { ...state, question: action.payload, loading: false };
    case GET_QUESTION_FAIL:
      return { ...state, loading: false, question: null };
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

    default:
      return state;
  }
};

export default reducer;
