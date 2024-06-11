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
    content: "",
    position: { index: 0, length: 0 },
    data: [],
    error: null,
  },
};

const plagiarism = createSlice({
  name: "plagiarism",
  initialState,
  reducers: {
    setWriterPlagiarism: (state, action) => {
      const payload = pick(action.payload, [
        "loading",
        "content",
        "position",
        "data",
        "error",
      ]);
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
        const results = action.payload.data;
        state.writer.loading = "idle";
        state.writer.data = results.data;
        if (Array.isArray(results) && results.length === 0) {
          toastMessage.success(
            "No plagiarism detected!",
            5000
          );
        }
      }
    },
    [postCheckPlagiarism.rejected]: (state, action) => {
      if (state.writer.loading === "pending") {
        const data = action.payload?.data;
        state.writer.loading = "idle";
        state.writer.error = data;
        const errmessage = data?.message;
        if (errmessage) {
          toastMessage.error(errmessage);
        }
      }
    },
  },
});

const between = (x, min, max) => {
  return x >= min && x <= max;
};

export const plagiarismSelector = {
  getPlagiarism: createSelector(
    (state) => state.plagiarism,
    (plagiarism) => plagiarism
  ),
  getPlagiarismWriterMark: createSelector(
    (state) => state.plagiarism,
    (plagiarism) => {
      const { data, position, content } = plagiarism.writer;

      if (Array.isArray(data) && data.length > 0) {
        const isSelectedText = position.index !== 0;
       
        const formattedMark = data.map((item) => {
          const ranges = item;
          const index = isSelectedText ? ranges[0] + position.index : ranges[0];
          const length = isSelectedText
            ? ranges[1] + position.index
            : ranges[1];
          // const wordsMatched = item.source.wordsMatched;

          return {
            // text: item.text,
            position: { index, length },
            // wordsMatched,
          };
        });

        formattedMark.sort((a, b) => a.position.index - b.position.index);

        let newdata = [];

        // Array object merge start
        for (let i = 0; i < formattedMark.length; i++) {
          const item = formattedMark[i];
          const itemPosition = item.position;

          if (i === 0) {
            newdata.push({ position: itemPosition });
            continue;
          }

          const { position: prevPosition } = newdata[newdata.length - 1];
          const inBetween = between(
            itemPosition.index,
            prevPosition.index,
            prevPosition.length
          );

          if (!inBetween) {
            newdata.push({ position: itemPosition });
          } else {
            if (prevPosition.length <= itemPosition.length) {
              prevPosition.length = itemPosition.length;
            }
          }
        }
        // Array object merge end

        let html = "";
        let lastLength = 0;

        for (let i = 0; i < newdata.length; i++) {
          const { position } = newdata[i];
          const isLastItem = newdata.length === i + 1;

          if (typeof window !== "undefined") {
            let span = document.createElement("span");
            span.className = "p-mark";
            const prevLastContent = content.slice(lastLength, position.index);
            const spanContent = content.slice(position.index, position.length);
            span.appendChild(document.createTextNode(spanContent));
            html += prevLastContent + span.outerHTML;
            lastLength = position.length;
            if (isLastItem) {
              html += content.slice(position.length, content.length);
            }
          }
        }
        return html;
      }
      return "<h5>Please select some text to check plagiarism!</h5>";
    }
  ),
};

export const plagiarismActions = plagiarism.actions;

export default plagiarism;
