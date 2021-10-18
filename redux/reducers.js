import { combineReducers } from "@reduxjs/toolkit";

import counterReducer from "@redux/slices/counterSlice";

const reducers = combineReducers({
  auth: () => true,
  counter: counterReducer,
});

export default reducers;
