import { combineReducers } from "redux";
import auth from "./auth/auth.reducer";
import user from "./user/user.reducer";
import questions from "./questions/questions.reducer";
import { connectRouter } from "connected-react-router";

// export default combineReducers({
//   auth,
//   user,
//   questions,
// });

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    user,
    questions,
  });
export default createRootReducer;
