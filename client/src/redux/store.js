import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;
