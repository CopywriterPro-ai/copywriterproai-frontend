import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

import reducer from "@/redux/reducers";
import authMiddleware from "@/redux/middleware/auth";
import {
  isServer,
  stateSyncPredicate,
  persistStorage as storage,
} from "@/utils";

const middleware = (getDefaultMiddleware) => {
  const items = [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    authMiddleware,
  ];
  if (!isServer) {
    items.push(
      createStateSyncMiddleware({
        predicate: stateSyncPredicate,
      })
    );
  }
  return items;
};

const ReduxStoreConfigure = (reducer) => {
  return configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== "production",
  });
};

const makeStore = () => {
  if (isServer) {
    return ReduxStoreConfigure(reducer);
  } else {
    const { persistStore, persistReducer } = require("redux-persist");

    const persistConfig = {
      key: "ai_copywriter",
      storage,
      version: 1.0,
      whitelist: ["auth", "payment"],
    };

    const persistedReducer = persistReducer(persistConfig, reducer);
    const store = ReduxStoreConfigure(persistedReducer);
    store.__persistor = persistStore(store);
    initMessageListener(store);
    return store;
  }
};

export const wrapper = createWrapper(makeStore);
