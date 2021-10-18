import { configureStore } from "@reduxjs/toolkit";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
import throttle from "lodash.throttle";

import reducer from "@redux/reducers";
import authMiddleware from "@redux/middleware/auth";
import { isServer, stateStorage } from "@utils/index";

const { saveState } = stateStorage;

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

store.subscribe(
  throttle(() => {
    const { counter } = store.getState();
    saveState({
      counter,
    });
  }, 1000)
);

initMessageListener(store);

export default store;
