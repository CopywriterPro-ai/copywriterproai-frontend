import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { contentApi } from "@/api";
import {
  BLOG_IDEA,
  BLOG_HEADLINE,
  BLOG_INTRO,
  BLOG_OUTLINE,
  BLOG_TOPIC,
  BLOG_OUTRO,
} from "@/appconstants";
import { asyncThunkError, pick } from "@/utils";

export const postWriterAlongContents = createAsyncThunk(
  "content/postWriterAlongContentsFetching",
  async ({ data, task }, { rejectWithValue }) => {
    try {
      const response = await contentApi.postGenerateContents({ data, task });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postWriterAlongEditorToolsContent = createAsyncThunk(
  "content/postWriterAlongEditorToolsContentFetching",
  async ({ data, task }, { rejectWithValue }) => {
    try {
      const response = await contentApi.postGenerateContents({ data, task });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

const tasksArr = {
  about: "about",
  [BLOG_HEADLINE]: "headline",
  [BLOG_INTRO]: "intro",
  [BLOG_OUTLINE]: "outline",
  [BLOG_IDEA]: "idea",
  [BLOG_OUTRO]: "outro",
  [BLOG_TOPIC]: "topic",
};

const initialState = {
  currenttask: BLOG_HEADLINE,
  currentid: "",
  about: {
    loading: "idle",
    item: "",
    items: [],
    error: null,
  },
  headline: {
    loading: "idle",
    item: "",
    items: [],
    error: null,
  },
  intro: {
    loading: "idle",
    item: "",
    items: [],
    error: null,
  },
  outline: {
    loading: "idle",
    item: "",
    items: [],
    error: null,
  },
  idea: {
    loading: "idle",
    item: "",
    items: [],
    error: null,
  },
  outro: {
    loading: "idle",
    item: "",
    items: [],
    error: null,
  },
  topic: {
    loading: "idle",
    item: "",
    items: [],
    error: null,
  },
  content: {
    loading: "idle",
    item: "",
    items: [],
    error: null,
  },
  editor: {
    currenttask: BLOG_TOPIC,
    range: { index: 0, length: 0 },
    selected: null,
    value: [],
  },
};

const blog = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetBlog: () => initialState,
    setCurrentTask: (state, action) => {
      state.currenttask = action.payload;
    },
    setCurrentId: (state, action) => {
      state.currentid = action.payload;
    },
    setEditorDefault: (state, action) => {
      const { headline, about, body, currentid } = action.payload;
      state.headline.item = headline;
      state.about.item = about;
      state.editor.value = body;
      state.currentid = currentid;
    },
    setAbout: (state, action) => {
      const payload = pick(action.payload, ["item", "items"]);
      state.about = { ...state.about, ...payload };
    },
    setHeadline: (state, action) => {
      const payload = pick(action.payload, ["item", "items"]);
      state.headline = { ...state.headline, ...payload };
    },
    setIntro: (state, action) => {
      const payload = pick(action.payload, ["item", "items"]);
      state.intro = { ...state.intro, ...payload };
    },
    setOutline: (state, action) => {
      const payload = pick(action.payload, ["item", "items"]);
      state.outline = { ...state.outline, ...payload };
    },
    setIdea: (state, action) => {
      const payload = pick(action.payload, ["item", "items"]);
      state.idea = { ...state.idea, ...payload };
    },
    setOutro: (state, action) => {
      const payload = pick(action.payload, ["item", "items"]);
      state.outro = { ...state.outro, ...payload };
    },
    setTopic: (state, action) => {
      const payload = pick(action.payload, ["item", "items"]);
      state.topic = { ...state.topic, ...payload };
    },
    setEditor: (state, action) => {
      const payload = pick(action.payload, [
        "range",
        "selected",
        "value",
        "currenttask",
      ]);
      state.editor = { ...state.editor, ...payload };
    },
    setContent: (state, action) => {
      const payload = pick(action.payload, ["item", "items"]);
      state.content = { ...state.content, ...payload };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.blog,
    }),
    [postWriterAlongContents.pending]: (state, action) => {
      const task = tasksArr[action.meta?.arg?.task];
      if (state[task].loading === "idle" && task) {
        state[task].loading = "pending";
        state[task].error = null;
      }
    },
    [postWriterAlongContents.fulfilled]: (state, action) => {
      const task = tasksArr[action.meta?.arg?.task];
      if (state[task].loading === "pending" && task) {
        const generatedTexts = action.payload.data?.generatedTexts;
        state[task].loading = "idle";
        state[task].items = generatedTexts;
      }
    },
    [postWriterAlongContents.rejected]: (state, action) => {
      const task = tasksArr[action.meta?.arg?.task];
      if (state[task].loading === "pending" && task) {
        state[task].loading = "idle";
        state[task].error = action.payload.data;
      }
    },

    [postWriterAlongEditorToolsContent.pending]: (state, action) => {
      if (state.content.loading === "idle") {
        state.content.loading = "pending";
        state.content.current = action.meta?.arg?.task;
        state.content.error = null;
      }
    },
    [postWriterAlongEditorToolsContent.fulfilled]: (state, action) => {
      if (state.content.loading === "pending") {
        // const text = action.payload.data?.generatedTexts[0];
        state.content.loading = "idle";
        state.content.items = action.payload.data?.generatedTexts;
        // state.content.item = `\n${text}`;
      }
    },
    [postWriterAlongEditorToolsContent.rejected]: (state, action) => {
      if (state.content.loading === "pending") {
        state.content.loading = "idle";
        state.content.error = action.payload.data;
      }
    },
  },
});

const isEmptyArr = (arr) => {
  return Boolean(!Array.isArray(arr) || !arr.length);
};

export const selectors = {
  getWriterAlong: createSelector(
    (state) => state.blog,
    (blog) => blog
  ),
  getEditor: () =>
    createSelector([selectors.getWriterAlong], ({ editor }) => editor),

  getContent: () =>
    createSelector([selectors.getWriterAlong], ({ content }) => content),
  getContentItem: (taskKey) =>
    createSelector([selectors.getWriterAlong], (writerAlong) => {
      const task = tasksArr[taskKey];
      if (task) {
        const isCurrentTask = writerAlong.currenttask === taskKey;
        const currentTask = writerAlong[task];
        const filteritems = currentTask.items.filter(
          (item) => item.trim().length > 0
        );
        return {
          ...currentTask,
          loading: isCurrentTask && currentTask.loading === "pending",
          isCurrentTask,
          items: filteritems,
          isEmpty: isEmptyArr(filteritems),
        };
      } else {
        return {
          error: "invalid task",
          isCurrentTask: false,
          isEmpty: true,
          item: "",
          items: [],
          loading: false,
        };
      }
    }),
};

export const writerAlongActions = blog.actions;

export default blog.reducer;
