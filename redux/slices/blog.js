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
  BLOG_FROM_OUTLINE,
} from "@/appconstants";
import { asyncThunkError, pick } from "@/utils";

export const postWriteAlongContents = createAsyncThunk(
  "content/postWriteAlongContentsFetching",
  async ({ data, task }, { rejectWithValue }) => {
    try {
      const response = await contentApi.postGenerateContents({ data, task });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postWriteAlongEditorToolsContent = createAsyncThunk(
  "content/postWriteAlongEditorToolsContentFetching",
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
  [BLOG_FROM_OUTLINE]: "outlineblog",
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
  outlineblog: {
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
    setOutlineBlog: (state, action) => {
      const payload = pick(action.payload, ["item", "items"]);
      state.outlineblog = { ...state.outline, ...payload };
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
    [postWriteAlongContents.pending]: (state, action) => {
      const task = tasksArr[action.meta?.arg?.task];
      if (state[task].loading === "idle" && task) {
        state[task].loading = "pending";
        state[task].error = null;
      }
    },
    [postWriteAlongContents.fulfilled]: (state, action) => {
      const task = tasksArr[action.meta?.arg?.task];
      if (state[task].loading === "pending" && task) {
        state[task].loading = "idle";
        const generatedTexts = action.payload.data?.generatedTexts;
        if (Array.isArray(generatedTexts)) {
          state[task].items = generatedTexts;
        } else {
          state[task].item = generatedTexts;
        }
      }
    },
    [postWriteAlongContents.rejected]: (state, action) => {
      const task = tasksArr[action.meta?.arg?.task];
      if (state[task].loading === "pending" && task) {
        state[task].loading = "idle";
        state[task].error = action.payload.data;
      }
    },

    [postWriteAlongEditorToolsContent.pending]: (state, action) => {
      if (state.content.loading === "idle") {
        state.content.loading = "pending";
        state.content.current = action.meta?.arg?.task;
        state.content.error = null;
      }
    },
    [postWriteAlongEditorToolsContent.fulfilled]: (state, action) => {
      if (state.content.loading === "pending") {
        // const text = action.payload.data?.generatedTexts[0];
        state.content.loading = "idle";
        state.content.items = action.payload.data?.generatedTexts;
        // state.content.item = `\n${text}`;
      }
    },
    [postWriteAlongEditorToolsContent.rejected]: (state, action) => {
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
  getWriteAlong: createSelector(
    (state) => state.blog,
    (blog) => blog
  ),
  getEditor: () =>
    createSelector([selectors.getWriteAlong], ({ editor }) => editor),

  getContent: () =>
    createSelector([selectors.getWriteAlong], ({ content }) => content),
  getContentItem: (taskKey) =>
    createSelector([selectors.getWriteAlong], (writeAlong) => {
      const task = tasksArr[taskKey];
      if (task) {
        const isCurrentTask = writeAlong.currenttask === taskKey;
        const currentTask = writeAlong[task];
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

export const writeAlongActions = blog.actions;

export default blog.reducer;
