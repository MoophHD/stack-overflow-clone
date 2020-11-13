import { GET_USER } from "./user.types";

const initialState = {
  data: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
