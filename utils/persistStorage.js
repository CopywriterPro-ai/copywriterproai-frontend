import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import isServer from "./isServer";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = isServer ? createNoopStorage() : createWebStorage("local");

export default storage;
