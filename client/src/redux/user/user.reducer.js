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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      console.log(action);
      return {
        ...state,
        ...action.payload,
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
      };
    default:
      return state;
  }
};

export default reducer;
