import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
// import {
//   createStateSyncMiddleware,
//   initMessageListener,
// } from "redux-state-sync";

import storage from "@redux/storage";
import reducers from "@redux/reducers";
import authMiddleware from "@redux/middleware/auth";

// const stateSyncConfig = {
//   blacklist: ["persist/PERSIST", "persist/PURGE"],
// };

const middleware = (getDefaultMiddleware) => {
  return [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    authMiddleware,
    // createStateSyncMiddleware(stateSyncConfig),
  ];
};

const persistConfig = {
  key: "cwp",
  storage,
  version: 1.0,
  //   whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  serializableCheck: false,
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// initMessageListener(store);

export default store;
