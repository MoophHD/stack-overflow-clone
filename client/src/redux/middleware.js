import {checkAndRefreshToken} from "./auth/auth.actions";

export const persistToken = (store) => (next) => (action) => {
  if (store.getState().token) {
    checkAndRefreshToken();
  }

  next(action);
};
