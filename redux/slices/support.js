import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { supportApi } from "@/api";
import asyncThunkError from "@/utils/asyncThunkError";

export const postContactUs = createAsyncThunk(
  "support/postContactUsFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await supportApi.postContactUs({ data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postFeatureRequest = createAsyncThunk(
  "support/postFeatureRequestFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await supportApi.postFeatureRequest({ data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postBugReport = createAsyncThunk(
  "support/postBugReportFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await supportApi.postBugReport({ data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

const initialState = {
  contactus: {
    loading: "idle",
    success: false,
    message: null,
    error: null,
  },
  featurerequest: {
    loading: "idle",
    success: false,
    message: null,
    error: null,
  },
  bugreport: {
    loading: "idle",
    success: false,
    message: null,
    error: null,
  },
};

const support = createSlice({
  name: "support",
  initialState,
  reducers: {},
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.support,
    }),
    [postContactUs.pending]: (state, action) => {
      if (state.contactus.loading === "idle") {
        state.contactus.loading = "pending";
        state.contactus.error = null;
      }
    },
    [postContactUs.fulfilled]: (state, action) => {
      if (state.contactus.loading === "pending") {
        state.contactus.loading = "idle";
        state.contactus.success = true;
        state.contactus.message = action.payload.data.message;
      }
    },
    [postContactUs.rejected]: (state, action) => {
      if (state.contactus.loading === "pending") {
        state.contactus.loading = "idle";
        state.contactus.error = action.payload.data;
      }
    },

    [postFeatureRequest.pending]: (state, action) => {
      if (state.featurerequest.loading === "idle") {
        state.featurerequest.loading = "pending";
        state.featurerequest.error = null;
      }
    },
    [postFeatureRequest.fulfilled]: (state, action) => {
      if (state.featurerequest.loading === "pending") {
        state.featurerequest.loading = "idle";
        state.featurerequest.success = true;
        state.featurerequest.message = action.payload.data.message;
      }
    },
    [postFeatureRequest.rejected]: (state, action) => {
      if (state.featurerequest.loading === "pending") {
        state.featurerequest.loading = "idle";
        state.featurerequest.error = action.payload.data;
      }
    },

    [postBugReport.pending]: (state, action) => {
      if (state.bugreport.loading === "idle") {
        state.bugreport.loading = "pending";
        state.bugreport.error = null;
      }
    },
    [postBugReport.fulfilled]: (state, action) => {
      if (state.bugreport.loading === "pending") {
        state.bugreport.loading = "idle";
        state.bugreport.success = true;
        state.bugreport.message = action.payload.data.message;
      }
    },
    [postBugReport.rejected]: (state, action) => {
      if (state.bugreport.loading === "pending") {
        state.bugreport.loading = "idle";
        state.bugreport.error = action.payload.data;
      }
    },
  },
});

export const selectors = {
  getSupport: createSelector(
    (state) => state.support,
    (support) => support
  ),
};

export default support.reducer;
