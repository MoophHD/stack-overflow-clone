import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";
import { saveToken, persistToken } from "./middleware";

const middleware = [persistToken, thunk, saveToken];

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
