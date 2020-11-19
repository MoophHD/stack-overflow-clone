import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  CHECK_TOKEN_SUCCESS,
} from "./auth.types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_TOKEN_SUCCESS:
      return { state };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action.payload.token,
      };
    case REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        token: null,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
