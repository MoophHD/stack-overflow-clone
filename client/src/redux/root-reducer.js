import { combineReducers } from "redux";
import auth from "./auth/auth.reducer";
import user from "./user/user.reducer";
import questions from "./questions/questions.reducer";

export default combineReducers({
  auth,
  user,
  questions,
});
