import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

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

export const postSubscriptionSwitch = createAsyncThunk(
  "content/postSubscriptionSwitchFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await subscriberApi.postSubscriptionSwitch({ data });
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
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.subscriber,
    }),
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

    [postSubscriptionSwitch.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = null;
      }
    },
    [postSubscriptionSwitch.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.data = action.payload.data.subscriber;
      }
    },
    [postSubscriptionSwitch.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload.data;
      }
    },
  },
});

export const selectors = {
  getSubscriber: createSelector(
    (state) => state.subscriber,
    (subscriber) => subscriber
  ),
  getOwnSubscriber: createSelector(
    (state) => state.subscriber,
    (subscriber) => {
      const date = new Date().toISOString();
      if (Object.values(subscriber.data).length === 0) {
        return {
          ...subscriber,
          data: {
            activeSubscription: {
              subscription: "Freemium",
              subscriptionExpire: date,
              words: 0,
            },
            copycounter: 0,
            dailyCreaditUsage: { usage: 0, date },
            freeTrial: { eligible: false, dailyLimitExceeded: true },
            subscriberInfo: { isPaidSubscribers: false, inputLimit: true },
            subscriptionAll: [],
          },
        };
      }
      return subscriber;
    }
  ),
};

export default subscriber.reducer;
