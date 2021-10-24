import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { demoGenerateApi } from "@/api";
import { asyncThunkError } from "@/utils";

export const postLandingDemo = createAsyncThunk(
  "demoContent/postLandingDemoFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await demoGenerateApi.postLandingDemo({
        data,
        task: data.task,
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

const initialState = {
  loading: "idle",
  task: null,
  items: [],
  error: null,
};

const demoGenerate = createSlice({
  name: "demoGenerate",
  initialState,
  reducers: {},
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.demoGenerate,
    }),
    [postLandingDemo.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = null;
      }
    },
    [postLandingDemo.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.task = action.meta.arg.data?.task;
        state.items = action.payload.data;
      }
    },
    [postLandingDemo.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload.data;
      }
    },
  },
});

export const selectors = {
  getDemoGenerate: createSelector(
    (state) => state.demoGenerate,
    (demoGenerate) => {
      const trimedDemo = demoGenerate.items.map((item) => item.trim());
      const items = trimedDemo.filter((item) => item.length !== 0);
      return { ...demoGenerate, items };
    }
  ),
};

export default demoGenerate.reducer;
