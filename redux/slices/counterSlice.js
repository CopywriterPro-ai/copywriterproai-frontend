import { createSlice, createSelector } from "@reduxjs/toolkit";

import stateStorage from "@utils/stateStorage";

const persistedState = stateStorage.loadState();
const counterState = persistedState?.counter;

const initState = {
  count: 0,
};

// const initialState = counterState
//   ? { ...initState, ...counterState }
//   : initState;

const initialState = initState;

const counter = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increamentCounter: (state, action) => {
      state.count = state.count + 1;
    },
    decreamentCounter: (state, action) => {
      state.count = state.count - 1;
    },
    resetCounter: (state, action) => {
      state.count = 0;
    },
  },
});

export const selectors = {
  getCounter: createSelector(
    (state) => state.counter.count,
    (count) => count
  ),
};

export const { increamentCounter, decreamentCounter, resetCounter } =
  counter.actions;

export default counter.reducer;
