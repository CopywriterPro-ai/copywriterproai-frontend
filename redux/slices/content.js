import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import Fuse from "fuse.js";
import { HYDRATE } from "next-redux-wrapper";

import { contentApi } from "@/api";
import asyncThunkError from "@/utils/asyncThunkError";

export const postGenerateContents = createAsyncThunk(
  "content/postGenerateContentsFetching",
  async ({ data, task }, { rejectWithValue }) => {
    try {
      const response = await contentApi.postGenerateContents({ data, task });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const getToolsContent = createAsyncThunk(
  "content/getToolsContentFetching",
  async (_, { rejectWithValue }) => {
    try {
      const response = await contentApi.getToolsContent();
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const getToolsCategory = createAsyncThunk(
  "content/getToolsCategoryFetching",
  async (_, { rejectWithValue }) => {
    try {
      const response = await contentApi.getToolsCategory();
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

const initialState = {
  activeKey: null,
  formContents: {
    loading: "idle",
    status: {
      fetchContent: false,
      fetchCategories: false,
    },
    items: [],
    categories: [],
    error: null,
  },
  generatedContents: {
    loading: "idle",
    content: {},
    error: null,
  },
};

const content = createSlice({
  name: "content",
  initialState,
  reducers: {
    resetContentState: () => {
      return initialState;
    },
    resetGeneratedContentsState: (state) => {
      return { ...state, generatedContents: initialState.generatedContents };
    },
    setCurrentActiveKeyState: (state, action) => {
      state.activeKey = action.payload;
    },
    updateContentText: (state, action) => {
      // state.generatedContents.content.generatedTexts[action.payload.index] =
      //   action.payload.text;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.content,
    }),
    [postGenerateContents.pending]: (state, action) => {
      if (state.generatedContents.loading === "idle") {
        state.generatedContents.loading = "pending";
        state.generatedContents.error = null;
      }
    },
    [postGenerateContents.fulfilled]: (state, action) => {
      if (state.generatedContents.loading === "pending") {
        state.generatedContents.loading = "idle";
        state.generatedContents.content = action.payload.data;
      }
    },
    [postGenerateContents.rejected]: (state, action) => {
      if (state.generatedContents.loading === "pending") {
        state.generatedContents.loading = "idle";
        state.generatedContents.error = action.payload.data;
      }
    },

    [getToolsContent.pending]: (state, action) => {
      if (state.formContents.loading === "idle") {
        state.formContents.loading = "pending";
        state.formContents.error = null;
      }
    },
    [getToolsContent.fulfilled]: (state, action) => {
      if (state.formContents.loading === "pending") {
        state.formContents.loading = "idle";
        state.formContents.items = action.payload.data.tools;
        state.formContents.status.fetchContent = true;
      }
    },
    [getToolsContent.rejected]: (state, action) => {
      if (state.formContents.loading === "pending") {
        state.formContents.loading = "idle";
        state.formContents.error = action.payload.data;
      }
    },

    [getToolsCategory.pending]: (state, action) => {
      if (state.generatedContents.loading === "idle") {
        state.generatedContents.loading = "pending";
        state.generatedContents.error = null;
      }
    },
    [getToolsCategory.fulfilled]: (state, action) => {
      if (state.generatedContents.loading === "pending") {
        state.generatedContents.loading = "idle";
        state.formContents.categories = action.payload.data.categories;
        state.formContents.status.fetchCategories = true;
      }
    },
    [getToolsCategory.rejected]: (state, action) => {
      if (state.generatedContents.loading === "pending") {
        state.generatedContents.loading = "idle";
        state.generatedContents.error = action.payload.data;
      }
    },
  },
});

export const selectors = {
  getContent: createSelector(
    (state) => state.content,
    (content) => content
  ),
  getformContents: () =>
    createSelector([selectors.getContent], (content) => content.formContents),

  getContentCategories: () =>
    createSelector([selectors.getformContents()], (formContents) => {
      return formContents.categories;
    }),

  getContentTools: () =>
    createSelector([selectors.getformContents()], (formContents) => {
      return formContents.items;
    }),

  getCategorywithTools: () =>
    createSelector(
      [selectors.getContentCategories(), selectors.getContentTools()],
      (categories, items) => {
        const categorieswithTools = categories.map((category) => {
          const categoryTools = items.filter(
            (item) => item?.category?.id === category.id
          );
          return { ...category, tools: categoryTools };
        });
        const notEmptyCategorieswithTools = categorieswithTools.filter(
          (item) => item.tools?.length
        );
        return notEmptyCategorieswithTools;
      }
    ),

  getCurrentActiveTool: () =>
    createSelector(
      [
        selectors.getContent,
        selectors.getContentTools(),
        selectors.getCategorywithTools(),
      ],
      ({ activeKey }, content, categorywithTools) => {
        const defaultKey = categorywithTools[0]?.tools[0]?.key;
        const defaultTool = content.find((tool) => tool.key === defaultKey);

        if (!activeKey) {
          return defaultTool;
        } else {
          const tool = content.find((tool) => tool.key === activeKey);
          if (tool) {
            return tool;
          } else {
            return defaultTool;
          }
        }
      }
    ),

  getCurrentActiveKey: () =>
    createSelector(
      [selectors.getCurrentActiveTool()],
      (activeTool) => activeTool?.key
    ),

  getformContentsIsOk: () =>
    createSelector(
      [selectors.getformContents()],
      ({ status }) => status.fetchContent && status.fetchCategories
    ),

  getGeneratedContents: () =>
    createSelector([selectors.getContent], ({ generatedContents }) => {
      const { loading, content: Content, error } = generatedContents;
      const { id, task, generatedTexts } = Content;
      const validTexts =
        generatedTexts && Array.isArray(generatedTexts) ? generatedTexts : [];
      const textsArr = validTexts.map((text, index) => {
        return { text: text.trim(), textIndex: index };
      });
      const contentTexts = textsArr.filter((item) => item.text.length > 0);
      return { loading, content: { id, task, contentTexts }, error };
    }),

  getContentSearch: (query = "", limit = 8) =>
    createSelector([selectors.getContentTools()], (contents) => {
      const options = {
        keys: ["key", "name", "category.name", "category.key"],
      };
      const fuse = new Fuse(contents, options);
      const results = fuse.search(query, { limit });
      const formatresult = results.map((result) => {
        return result.item;
      });
      return formatresult;
    }),
};

export const {
  resetContentState,
  resetGeneratedContentsState,
  setCurrentActiveKeyState,
  updateContentText,
} = content.actions;

export default content.reducer;
