import { GET_USER_SUCCESS, GET_USER_FAILURE } from "./user.types";

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
  score: null,
  answers: [],
  questions: [],
  jobExperience: null,
  jobPosition: null,
  techStack: null,
  nickName: null,
  loading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        email: null,
        firstName: null,
        lastName: null,
        score: null,
        answers: [],
        questions: [],
        jobExperience: null,
        jobPosition: null,
        techStack: null,
        nickName: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
