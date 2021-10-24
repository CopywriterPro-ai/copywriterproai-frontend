import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import deepEqual from "deep-equal";
import { HYDRATE } from "next-redux-wrapper";

import { contentApi, blogApi } from "@/api";
import {
  BLOG_IDEA,
  BLOG_HEADLINE,
  BLOG_INTRO,
  BLOG_OUTLINE,
  BLOG_TOPIC,
} from "@/appconstants";
import asyncThunkError from "@/utils/asyncThunkError";

export const postBlogContents = createAsyncThunk(
  "content/postBlogContentsFetching",
  async ({ data, task }, { rejectWithValue }) => {
    try {
      const response = await contentApi.postGenerateContents({ data, task });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postEditorToolsContent = createAsyncThunk(
  "content/postEditorToolsContentFetching",
  async ({ data, task }, { rejectWithValue }) => {
    try {
      const response = await contentApi.postGenerateContents({ data, task });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const getBlogs = createAsyncThunk(
  "blog/getBlogsFetching",
  async ({ params }, { rejectWithValue }) => {
    try {
      const response = await blogApi.getBlogs({ params });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blog/createBlogFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await blogApi.createBlog({ data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const getBlog = createAsyncThunk(
  "blog/getBlogFetching",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await blogApi.getBlog({ id });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlogFetching",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await blogApi.updateBlog({ id, data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlogFetching",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await blogApi.deleteBlog({ id });
      return { data: response.data, status: response.status, id };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

// const EMPTY_DELTA = { ops: [] };

const initialState = {
  loading: "idle",
  currenttask: BLOG_HEADLINE,
  about: "",
  title: "",
  intro: "",
  outline: "",
  blogidea: { items: [] },
  blogheadline: { items: [] },
  blogoutline: { items: [] },
  blogintro: { items: [] },
  blogtopic: { items: [] },
  editor: {
    range: null,
    selected: null,
    value: [],
  },
  toolcontents: {
    loading: "idle",
    current: null,
    item: "",
    items: [],
    error: null,
  },
  blogs: {
    currentid: "",
    loading: "idle",
    meta: {},
    items: [],
    item: {},
    error: null,
  },
  error: null,
};

const blog = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetBlog: () => initialState,
    setStateBlogAbout: (state, action) => {
      state.about = action.payload;
    },
    setStateBlogTitle: (state, action) => {
      state.title = action.payload;
      state.currenttask = BLOG_INTRO;
    },
    setStateBlogIntro: (state, action) => {
      state.intro = action.payload;
      state.currenttask = BLOG_OUTLINE;
    },
    setStateBlogOutline: (state, action) => {
      state.outline = action.payload;
      state.currenttask = null;
    },

    setCurrentTask: (state, action) => {
      state.currenttask = action.payload;
    },

    setEditorCurrentSelectedRange: (state, action) => {
      state.editor.range = action.payload;
    },
    setEditorCurrentSelectedText: (state, action) => {
      state.editor.selected = action.payload;
    },
    setEditorCurrentValue: (state, action) => {
      state.editor.value = action.payload;
    },
    setBlogCurrentId: (state, action) => {
      state.blogs.currentid = action.payload;
    },
    setBlogCurrentItem: (state, action) => {
      state.blogs.item = action.payload;
    },
    setCurrentBlogEditItem: (state, action) => {
      state.editor.value = action.payload.blogPost;
      state.title = action.payload.headline;
      state.about = action.payload.blogAbout;
    },
    setCurrentToolContent: (state, action) => {
      state.toolcontents.item = action.payload;
    },
    setEmptyCurrentToolContents: (state, action) => {
      state.toolcontents.items = [];
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.blog,
    }),
    [postBlogContents.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = null;
      }
    },
    [postBlogContents.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        const task = action.payload.data?.task;
        const generatedTexts = action.payload.data?.generatedTexts;

        state.loading = "idle";

        switch (task) {
          case BLOG_IDEA:
            state.blogidea.items = generatedTexts;
            break;

          case BLOG_HEADLINE:
            state.blogheadline.items = generatedTexts;
            break;

          case BLOG_OUTLINE:
            state.blogoutline.items = generatedTexts;
            break;

          case BLOG_INTRO:
            state.blogintro.items = generatedTexts;
            break;

          case BLOG_TOPIC:
            state.blogtopic.items = generatedTexts;
            break;

          default:
            state.error = action.payload.data;
        }
      }
    },
    [postBlogContents.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload.data;
      }
    },

    [postEditorToolsContent.pending]: (state, action) => {
      if (state.toolcontents.loading === "idle") {
        state.toolcontents.loading = "pending";
        state.toolcontents.current = action.meta?.arg?.task;
        state.toolcontents.error = null;
      }
    },
    [postEditorToolsContent.fulfilled]: (state, action) => {
      if (state.toolcontents.loading === "pending") {
        const text = action.payload.data?.generatedTexts[0];
        state.toolcontents.loading = "idle";
        // state.toolcontents.items = action.payload.data?.generatedTexts;
        state.toolcontents.item = `\n${text}`;
      }
    },
    [postEditorToolsContent.rejected]: (state, action) => {
      if (state.toolcontents.loading === "pending") {
        state.toolcontents.loading = "idle";
        state.toolcontents.error = action.payload.data;
      }
    },

    [getBlogs.pending]: (state, action) => {
      if (state.blogs.loading === "idle") {
        state.blogs.loading = "pending";
        state.blogs.error = null;
      }
    },
    [getBlogs.fulfilled]: (state, action) => {
      if (state.blogs.loading === "pending") {
        const { results, page, limit, totalPages, totalResults } =
          action.payload.data;

        state.blogs.loading = "idle";
        state.blogs.items = results;
        state.blogs.meta = { page, limit, totalPages, totalResults };
      }
    },
    [getBlogs.rejected]: (state, action) => {
      if (state.blogs.loading === "pending") {
        state.blogs.loading = "idle";
        state.blogs.error = action.payload.data;
      }
    },

    [createBlog.pending]: (state, action) => {
      if (state.blogs.loading === "idle") {
        state.blogs.loading = "pending";
        state.blogs.error = null;
      }
    },
    [createBlog.fulfilled]: (state, action) => {
      if (state.blogs.loading === "pending") {
        state.blogs.loading = "idle";
        state.blogs.items.push(action.payload.data);
        state.blogs.item = action.payload.data;
        state.blogs.currentid = action.payload.data?.id;
      }
    },
    [createBlog.rejected]: (state, action) => {
      if (state.blogs.loading === "pending") {
        state.blogs.loading = "idle";
        state.blogs.error = action.payload.data;
      }
    },

    [getBlog.pending]: (state, action) => {
      if (state.blogs.loading === "idle") {
        state.blogs.loading = "pending";
        state.blogs.error = null;
      }
    },
    [getBlog.fulfilled]: (state, action) => {
      if (state.blogs.loading === "pending") {
        state.blogs.loading = "idle";
        state.blogs.item = action.payload.data;
      }
    },
    [getBlog.rejected]: (state, action) => {
      if (state.blogs.loading === "pending") {
        state.blogs.loading = "idle";
        state.blogs.error = action.payload.data;
      }
    },

    [updateBlog.pending]: (state, action) => {
      if (state.blogs.loading === "idle") {
        state.blogs.loading = "pending";
        state.blogs.error = null;
      }
    },
    [updateBlog.fulfilled]: (state, action) => {
      if (state.blogs.loading === "pending") {
        const updateblog = action.payload.data;
        const findIndex = state.blogs.items.findIndex(
          (item) => item.id === updateblog.id
        );
        state.blogs.loading = "idle";
        state.blogs.item = updateblog;
        if (findIndex) state.blogs.items[findIndex] = updateblog;
      }
    },
    [updateBlog.rejected]: (state, action) => {
      if (state.blogs.loading === "pending") {
        state.blogs.loading = "idle";
        state.blogs.error = action.payload.data;
      }
    },

    [deleteBlog.pending]: (state, action) => {
      if (state.blogs.loading === "idle") {
        state.blogs.loading = "pending";
        state.blogs.error = null;
      }
    },
    [deleteBlog.fulfilled]: (state, action) => {
      if (state.blogs.loading === "pending") {
        const { id } = action.meta.arg;
        state.blogs.loading = "idle";
        state.blogs.items = state.blogs.items.filter((item) => item.id !== id);
        state.blogs.item = {};
      }
    },
    [deleteBlog.rejected]: (state, action) => {
      if (state.blogs.loading === "pending") {
        state.blogs.loading = "idle";
        state.blogs.error = action.payload.data;
      }
    },
  },
});

const isEmptyArr = (arr) => {
  return Boolean(!Array.isArray(arr) || !arr.length);
};

const getItem = ({ blog, key, isCurrentTask }) => {
  const items = blog[key].items;
  const filteritems = items.filter((item) => item.trim().length > 0);
  return {
    loading: isCurrentTask && blog.loading === "pending",
    isCurrentTask,
    items: filteritems,
    isEmpty: isEmptyArr(filteritems),
  };
};

export const selectors = {
  getBlogContent: createSelector(
    (state) => state.blog,
    (blog) => blog
  ),

  getBlogItem: (taskKey) =>
    createSelector([selectors.getBlogContent], (blog) => {
      const isCurrentTask = blog.currenttask === taskKey;

      switch (taskKey) {
        case BLOG_IDEA:
          return getItem({ blog, key: "blogidea", isCurrentTask });

        case BLOG_HEADLINE:
          return getItem({ blog, key: "blogheadline", isCurrentTask });

        case BLOG_OUTLINE:
          return getItem({ blog, key: "blogoutline", isCurrentTask });

        case BLOG_INTRO:
          return getItem({ blog, key: "blogintro", isCurrentTask });

        case BLOG_TOPIC:
          return getItem({ blog, key: "blogtopic", isCurrentTask });

        default:
          return {};
      }
    }),

  getEditor: () =>
    createSelector([selectors.getBlogContent], ({ editor }) => {
      return editor;
    }),

  getToolContent: () =>
    createSelector([selectors.getBlogContent], ({ toolcontents }) => {
      return toolcontents;
    }),

  getBlogs: () =>
    createSelector([selectors.getBlogContent], ({ blogs }) => {
      return blogs;
    }),

  isUpdateChange: () =>
    createSelector(
      [selectors.getBlogContent],
      ({ blogs, editor, title, about }) => {
        const { blogAbout = "", blogPost = [], headline = "" } = blogs.item;

        const isValueEquile =
          JSON.stringify(editor.value) === JSON.stringify([{ insert: "\n" }]);

        const currentBlog = {
          blogAbout,
          blogPost,
          headline,
        };

        const updatedBlog = {
          blogAbout: about,
          blogPost: isValueEquile ? [] : editor.value,
          headline: title,
        };

        return !deepEqual(currentBlog, updatedBlog);
      }
    ),
};

export const {
  resetBlog,
  setStateBlogAbout,
  setStateBlogTitle,
  setStateBlogIntro,
  setStateBlogOutline,
  setCurrentTask,
  setEditorCurrentSelectedRange,
  setEditorCurrentSelectedText,
  setEditorCurrentValue,
  setBlogCurrentId,
  setBlogCurrentItem,
  setCurrentBlogEditItem,
  setCurrentToolContent,
  setEmptyCurrentToolContents,
} = blog.actions;

export default blog.reducer;
