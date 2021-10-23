import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import { subscriberApi } from "@/api";
import asyncThunkError from "@/utils/asyncThunkError";

export const getOwnSubscriber = createAsyncThunk(
  "subscriber/getOwnSubscriberFetching",
  async (_, { rejectWithValue }) => {
    try {
      const response = await subscriberApi.getOwnSubscriber();
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const patchGenerateUpdate = createAsyncThunk(
  "content/patchGenerateUpdateFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await subscriberApi.patchGenerateUpdate({ data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

const initialState = {
  loading: "idle",
  data: {},
  error: null,
};

const subscriber = createSlice({
  name: "subscriber",
  initialState,
  reducers: {},
  extraReducers: {
    [getOwnSubscriber.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = null;
      }
    },
    [getOwnSubscriber.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.data = action.payload.data.subscriber;
      }
    },
    [getOwnSubscriber.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload.data;
      }
    },
    [patchGenerateUpdate.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.data = action.payload.data.subscriber;
    },
  },
});

// export const {} = subscriber.reducer;

export const selectors = {
  getOwnSubscriber: createSelector(
    (state) => state.subscriber,
    (subscriber) => subscriber
  ),
};

export default subscriber.reducer;
