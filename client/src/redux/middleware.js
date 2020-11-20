import { checkAndRefreshToken } from "./auth/auth.actions";
import setAuthToken from "./auth/auth.utils";

export const persistToken = (store) => (next) => (action) => {
  // persist token on only async functions
  if (typeof action == "function" && store.getState().auth.token) {
    checkAndRefreshToken()(store.dispatch, store.getState);
  }

  next(action);
};

export const saveToken = (store) => (next) => (action) => {
  const previousToken = store.getState().auth.token;
  next(action);
  const nextToken = store.getState().auth.token;

  if (nextToken !== previousToken) {
    setAuthToken(nextToken);
  }
};
