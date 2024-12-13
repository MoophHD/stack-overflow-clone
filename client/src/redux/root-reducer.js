import { combineReducers } from "redux";
import auth from "./auth/auth.reducer";
import user from "./user/user.reducer";
import questions from "./questions/questions.reducer";
import alert from "./alert/alert.reducer";
import questionDiscussion from "./questionDiscussion/questionsDiscussion.reducer";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    user,
    questions,
    alert,
    questionDiscussion,
  });
export default createRootReducer;
