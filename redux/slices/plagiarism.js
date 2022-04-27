import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import asyncThunkError from "@/utils/asyncThunkError";
import { plagiarismApi } from "@/api";
import { pick, toastMessage } from "@/utils";

export const postCheckPlagiarism = createAsyncThunk(
  "plagiarism/postCheckPlagiarismFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await plagiarismApi.postCheckPlagiarism({ data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

const initialState = {
  writer: {
    loading: "idle",
    data: [],
    error: null,
  },
};

const plagiarism = createSlice({
  name: "plagiarism",
  initialState,
  reducers: {
    setWriterPlagiarism: (state, action) => {
      const payload = pick(action.payload, ["loading", "data", "error"]);
      state.writer = { ...state.writer, ...payload };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.plagiarism,
    }),

    [postCheckPlagiarism.pending]: (state, action) => {
      if (state.writer.loading === "idle") {
        state.writer.loading = "pending";
        state.writer.error = null;
      }
    },
    [postCheckPlagiarism.fulfilled]: (state, action) => {
      if (state.writer.loading === "pending") {
        const result = action.payload.data.result;
        state.writer.loading = "idle";
        state.writer.data = result;

        if (Array.isArray(result) && result.length === 0) {
          toastMessage.success(
            "Congratulations, not plagiarism detected",
            5000
          );
        }
      }
    },
    [postCheckPlagiarism.rejected]: (state, action) => {
      if (state.writer.loading === "pending") {
        state.writer.loading = "idle";
        state.writer.error = action.payload.data;
      }
    },
  },
});

export const plagiarismSelector = {
  getPlagiarism: createSelector(
    (state) => state.plagiarism,
    (plagiarism) => plagiarism
  ),
};

export const plagiarismActions = plagiarism.actions;

export default plagiarism;
