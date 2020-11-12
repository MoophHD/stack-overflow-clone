export const persistToken = (store) => (next) => (action) => {
  //check if action is in need of auth => check token validity => refresh => redirect to login on failure
  console.log("Middleware triggered:", action);
  next(action);
};
