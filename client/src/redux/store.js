import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createRootReducer from "./root-reducer";
import { saveToken } from "./middleware";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

const middleware = [thunk, saveToken, routerMiddleware(history)];

const initialState = {};
const store = createStore(
  createRootReducer(history),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
