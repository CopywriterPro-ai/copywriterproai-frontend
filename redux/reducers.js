import { combineReducers } from "@reduxjs/toolkit";

import uiReducer from "@/redux/slices/ui";
import authReducer from "@/redux/slices/auth";
import contentReducer from "@/redux/slices/content";
import paymentReuducer from "@/redux/slices/payment";
import userReducer from "@/redux/slices/user";
import supportReducer from "@/redux/slices/support";
import blogReducer from "@/redux/slices/blog";
import subscriberReducer from "@/redux/slices/subscriber";
import toolsReducer from "@/redux/slices/tools";
import demoGenerateReducer from "@/redux/slices/demoGenerate";
import completeBlogReducer from "@/redux/slices/completeBlog";

const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  content: contentReducer,
  payment: paymentReuducer,
  user: userReducer,
  support: supportReducer,
  blog: blogReducer,
  subscriber: subscriberReducer,
  tools: toolsReducer,
  demoGenerate: demoGenerateReducer,
  completeBlog: completeBlogReducer,
});

export default reducers;
