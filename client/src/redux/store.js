import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createRootReducer from "./root-reducer";
import { saveToken } from "./middleware";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

const middleware = [thunk, saveToken, routerMiddleware(history)];

export const createReduxStore = () => {
  return createStore(
    createRootReducer(history),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};

const initialState = {};
const store = createReduxStore();

export default store;
