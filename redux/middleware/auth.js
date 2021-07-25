const auth = (store) => (next) => (action) => {
  next(action);
};

export default auth;
