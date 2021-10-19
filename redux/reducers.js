import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "@/redux/slices/auth";
import uiReducer from "@/redux/slices/ui";
import demoGenerateReducer from "@/redux/slices/demoGenerate";

const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  demoGenerate: demoGenerateReducer,
});

export default reducers;
