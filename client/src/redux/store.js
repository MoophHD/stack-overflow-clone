import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createRootReducer from "./root-reducer";
import { saveToken, persistToken } from "./middleware";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

const middleware = [persistToken, thunk, saveToken, routerMiddleware(history)];
// const middleware = [thunk, routerMiddleware(history)];

const initialState = {};
const store = createStore(
  createRootReducer(history),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
