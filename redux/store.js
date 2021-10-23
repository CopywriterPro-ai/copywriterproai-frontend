import { configureStore } from "@reduxjs/toolkit";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import throttle from "lodash.throttle";

import reducer from "@/redux/reducers";
import authMiddleware from "@/redux/middleware/auth";
import { isServer, stateStorage, stateSyncPredicate } from "@/utils";

const { saveState } = stateStorage;

const stateSyncConfig = {
  predicate: stateSyncPredicate,
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

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
  reducer: persistedReducer,
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

export const persistor = persistStore(store);

initMessageListener(store);

export default store;
