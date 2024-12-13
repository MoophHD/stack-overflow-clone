import setAuthToken from "./auth/auth.utils";

export const saveToken = (store) => (next) => (action) => {
  const previousToken = store.getState().auth.token;
  next(action);
  const nextToken = store.getState().auth.token;

  if (nextToken !== previousToken) {
    setAuthToken(nextToken);
  }
};
