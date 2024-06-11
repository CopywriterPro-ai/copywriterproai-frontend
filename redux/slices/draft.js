import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { blogApi } from "@/api";
import { pick, asyncThunkError } from "@/utils";

export const createBlog = createAsyncThunk(
  "draft/createBlogFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await blogApi.createBlog({ data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const getBlogs = createAsyncThunk(
  "draft/getBlogsFetching",
  async ({ params }, { rejectWithValue }) => {
    try {
      const response = await blogApi.getBlogs({ params });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const getBlog = createAsyncThunk(
  "draft/getBlogFetching",
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
  "draft/updateBlogFetching",
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
  "draft/deleteBlogFetching",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await blogApi.deleteBlog({ id });
      return { data: response.data, status: response.status, id };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

const initialState = {
  blogs: {
    loading: "idle",
    activeId: "",
    item: {},
    items: [],
    meta: {},
    error: null,
  },
};

const draft = createSlice({
  name: "draft",
  initialState,
  reducers: {
    resetBlogsDraft: (state, action) => {
      state.blogs.activeId = "";
      state.blogs.item = {};
    },
    setBlogsDraft: (state, action) => {
      const payload = pick(action.payload, [
        "activeId",
        "item",
        "items",
        "meta",
      ]);
      state.blogs = { ...state.blogs, ...payload };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.draft,
    }),

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
        state.blogs.activeId = action.payload.data?.id;
      }
    },
    [createBlog.rejected]: (state, action) => {
      if (state.blogs.loading === "pending") {
        state.blogs.loading = "idle";
        state.blogs.error = action.payload.data;
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
        const data = action.payload.data;
        const findIndex = state.blogs.items.findIndex(
          (item) => item.id === data.id
        );
        state.blogs.loading = "idle";
        state.blogs.item = data;
        if (findIndex) state.blogs.items[findIndex] = data;
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
        state.blogs.activeId = "";
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

export const selectors = {
  getDraft: createSelector(
    (state) => state.draft,
    (draft) => draft
  ),
  getDraftBlogs: () =>
    createSelector([selectors.getDraft], (draft) => draft.blogs),
};

export const { resetBlogsDraft, setBlogsDraft } = draft.actions;

export default draft.reducer;
