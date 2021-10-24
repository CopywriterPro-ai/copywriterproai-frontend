import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { userApi } from "@/api";
import { selectors as contentSelector } from "@/redux/slices/content";
import asyncThunkError from "@/utils/asyncThunkError";

export const updateBookmarks = createAsyncThunk(
  "user/updateBookmarksFetching",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await userApi.updateBookmarks({ userId, data });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const updateContent = createAsyncThunk(
  "user/updateContentFetching",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await userApi.updateContent({ userId, data });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const getBookmarks = createAsyncThunk(
  "user/getBookmarksFetching",
  async ({ userId, page, limit }, { rejectWithValue }) => {
    try {
      const response = await userApi.getBookmarks({ userId, page, limit });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const bookmarkReact = createAsyncThunk(
  "user/bookmarkReactFetching",
  async ({ userId, react, data }, { rejectWithValue }) => {
    try {
      const response = await userApi.bookmarkReact({ userId, react, data });
      return {
        data: response.data,
        status: response.status,
        react,
        contentId: data.contentId,
        index: data.index,
      };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const getFavouriteTools = createAsyncThunk(
  "user/getFavouriteToolsFetching",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await userApi.getFavouriteTools({ userId });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const updateFavouriteTools = createAsyncThunk(
  "user/updateFavouriteToolsFetching",
  async ({ data }, { rejectWithValue, getState }) => {
    const userId = getState().auth.info.data.id;
    try {
      const response = await userApi.updateFavouriteTools({ userId, data });
      return {
        toolkey: data.tool,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

const initialState = {
  currentgeneratebookmarks: {
    loading: "idle",
    current: {
      contentId: null,
      index: null,
      loading: "idle",
    },
    item: {
      contentId: null,
      contentIndexs: [],
    },
    error: null,
  },
  reactedbookmark: {
    loading: "idle",
    item: {
      contentId: null,
      like: [],
      dislike: [],
    },
    error: null,
  },
  bookmarks: {
    loading: "idle",
    items: [],
    totalpages: 0,
    error: null,
  },
  favouritetools: {
    loading: "idle",
    items: [],
    error: null,
  },
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteBookmarkIndexId: (state, action) => {
      state.currentgeneratebookmarks.item.contentIndexs =
        state.currentgeneratebookmarks.item.contentIndexs.filter(
          (contentId) => contentId !== action.payload
        );
    },
    setCurrentBookmarkIdIndex: (state, action) => {
      state.currentgeneratebookmarks.current.contentId =
        action.payload.contentId;
      state.currentgeneratebookmarks.current.index = action.payload.index;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.user,
    }),
    [updateBookmarks.pending]: (state, action) => {
      if (state.currentgeneratebookmarks.loading === "idle") {
        state.currentgeneratebookmarks.loading = "pending";
        state.currentgeneratebookmarks.current.loading = "pending";
        state.currentgeneratebookmarks.error = null;

        const { contentId, index } = state.currentgeneratebookmarks.current;
        const isCurrentId =
          state.currentgeneratebookmarks.item.contentId === contentId;
        if (isCurrentId) {
          const isInclude =
            state.currentgeneratebookmarks.item.contentIndexs.includes(index);

          if (!isInclude) {
            state.currentgeneratebookmarks.item.contentIndexs.push(index);
          } else {
            state.currentgeneratebookmarks.item.contentIndexs =
              state.currentgeneratebookmarks.item.contentIndexs.filter(
                (contentIndex) => contentIndex !== index
              );
          }
        } else {
          state.currentgeneratebookmarks.item = {
            contentIndexs: [],
            contentId,
          };
          state.currentgeneratebookmarks.item.contentIndexs.push(index);
        }
      }
    },
    [updateBookmarks.fulfilled]: (state, action) => {
      if (state.currentgeneratebookmarks.loading === "pending") {
        state.currentgeneratebookmarks.loading = "idle";
        state.currentgeneratebookmarks.current.loading = "idle";
      }
    },
    [updateBookmarks.rejected]: (state, action) => {
      if (state.currentgeneratebookmarks.loading === "pending") {
        state.currentgeneratebookmarks.loading = "idle";
        state.currentgeneratebookmarks.current.loading = "idle";
        state.currentgeneratebookmarks.error = action.payload.data;

        const { contentId, index } = state.currentgeneratebookmarks.current;
        const isCurrentId =
          state.currentgeneratebookmarks.item.contentId === contentId;
        if (isCurrentId) {
          const isInclude =
            state.currentgeneratebookmarks.item.contentIndexs.includes(index);

          if (!isInclude) {
            state.currentgeneratebookmarks.item.contentIndexs.push(index);
          } else {
            state.currentgeneratebookmarks.item.contentIndexs =
              state.currentgeneratebookmarks.item.contentIndexs.filter(
                (contentIndex) => contentIndex !== index
              );
          }
        } else {
          state.currentgeneratebookmarks.item = {
            contentIndexs: [],
            contentId,
          };
          state.currentgeneratebookmarks.item.contentIndexs.push(index);
        }
      }
    },
    [getBookmarks.pending]: (state, action) => {
      if (state.bookmarks.loading === "idle") {
        state.bookmarks.loading = "pending";
        state.bookmarks.error = null;
      }
    },
    [getBookmarks.fulfilled]: (state, action) => {
      if (state.bookmarks.loading === "pending") {
        state.bookmarks.loading = "idle";
        state.bookmarks.items = action.payload.data.contents;
        state.bookmarks.totalpages = action.payload.data.totalPages;
      }
    },
    [getBookmarks.rejected]: (state, action) => {
      if (state.bookmarks.loading === "pending") {
        state.bookmarks.loading = "idle";
        state.bookmarks.error = action.payload.data;
      }
    },
    [bookmarkReact.pending]: (state, action) => {
      if (state.reactedbookmark.loading === "idle") {
        state.reactedbookmark.loading = "pending";
        state.reactedbookmark.error = null;
      }
    },
    [bookmarkReact.fulfilled]: (state, action) => {
      if (state.reactedbookmark.loading === "pending") {
        const { contentId, react, index } = action.payload;
        const isCurrentId = state.reactedbookmark.item.contentId === contentId;
        const difReact = react === "like" ? "dislike" : "like";

        state.reactedbookmark.loading = "idle";
        if (isCurrentId) {
          state.reactedbookmark.item[react].push(index);
          state.reactedbookmark.item[difReact] = state.reactedbookmark.item[
            difReact
          ].filter((i) => i !== index);
        } else {
          state.reactedbookmark.item = {
            contentId: contentId,
            like: [],
            dislike: [],
          };
          state.reactedbookmark.item[react].push(index);
          state.reactedbookmark.item[difReact] = state.reactedbookmark.item[
            difReact
          ].filter((i) => i !== index);
        }
      }
    },
    [bookmarkReact.rejected]: (state, action) => {
      if (state.reactedbookmark.loading === "pending") {
        state.reactedbookmark.loading = "idle";
        state.reactedbookmark.error = action.payload.data;
      }
    },

    [getFavouriteTools.pending]: (state, action) => {
      if (state.favouritetools.loading === "idle") {
        state.favouritetools.loading = "pending";
        state.favouritetools.error = null;
      }
    },
    [getFavouriteTools.fulfilled]: (state, action) => {
      if (state.favouritetools.loading === "pending") {
        state.favouritetools.loading = "idle";
        state.favouritetools.items = action.payload.data;
      }
    },
    [getFavouriteTools.rejected]: (state, action) => {
      if (state.favouritetools.loading === "pending") {
        state.favouritetools.loading = "idle";
        state.favouritetools.error = action.payload.data;
      }
    },

    [updateFavouriteTools.pending]: (state, action) => {
      if (state.favouritetools.loading === "idle") {
        state.favouritetools.loading = "pending";
        state.favouritetools.error = null;
      }
    },
    [updateFavouriteTools.fulfilled]: (state, action) => {
      if (state.favouritetools.loading === "pending") {
        const toolkey = action.payload.toolkey;
        const isFavouriteTools = state.favouritetools.items.includes(toolkey);

        state.favouritetools.loading = "idle";
        if (isFavouriteTools) {
          state.favouritetools.items = state.favouritetools.items.filter(
            (item) => item !== toolkey
          );
        } else {
          state.favouritetools.items.push(toolkey);
        }
      }
    },
    [updateFavouriteTools.rejected]: (state, action) => {
      if (state.favouritetools.loading === "pending") {
        state.favouritetools.loading = "idle";
        state.favouritetools.error = action.payload.data;
      }
    },
  },
});

export const { deleteBookmarkIndexId, setCurrentBookmarkIdIndex } =
  user.actions;

export const selectors = {
  getUser: createSelector(
    (state) => state.user,
    (user) => user
  ),
  getCurrentBookmarks: createSelector(
    (state) => state.user.currentgeneratebookmarks,
    (bookmark) => bookmark
  ),
  bookmarkReact: createSelector(
    (state) => state.user.reactedbookmark,
    (reactedbookmark) => reactedbookmark
  ),
  getBookmarks: createSelector(
    (state) => state.user.bookmarks,
    (bookmarks) => bookmarks
  ),
  getFavouriteTools: createSelector(
    (state) => state.user.favouritetools,
    (favouritetools) => favouritetools
  ),
  isFavouriteTools: (key) =>
    createSelector([selectors.getFavouriteTools], (favouritetools) => {
      return favouritetools.items.includes(key);
    }),
  getFavouriteToolsWithDetails: () =>
    createSelector(
      [selectors.getFavouriteTools, contentSelector.getContentTools()],
      (favouriteTools, contentDetails) => {
        const { items: favouriteToolsItem } = favouriteTools;

        const favTools = contentDetails.filter((item) => {
          const findTools = favouriteToolsItem.find(
            (content) => content === item.key
          );
          if (findTools) {
            return true;
          }
          return false;
        });

        return favTools;
      }
    ),
};

export default user.reducer;
