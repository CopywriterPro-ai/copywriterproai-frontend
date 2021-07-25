import { configureStore } from "@reduxjs/toolkit";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
} from "redux-state-sync";

import reducer from "@redux/reducers";
import authMiddleware from "@redux/middleware/auth";

const isServer = typeof window === "undefined";

const stateSyncConfig = {
  blacklist: [],
};

const middleware = (getDefaultMiddleware) => {
  const items = [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    authMiddleware,
  ];

  if (!isServer) {
    items.push(createStateSyncMiddleware(stateSyncConfig));
  }

  return items;
};

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

initStateWithPrevTab(store);

export default store;
