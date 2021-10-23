import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import { toolsApi } from "@/api";
import asyncThunkError from "@/utils/asyncThunkError";

export const getToolCategories = createAsyncThunk(
  "tools/getToolCategoriesFetching",
  async (_, { rejectWithValue }) => {
    try {
      const response = await toolsApi.getToolCategories();
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postToolCategories = createAsyncThunk(
  "tools/postToolCategoriesFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await toolsApi.postToolCategories({ data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const patchToolCategory = createAsyncThunk(
  "tools/patchToolCategoryFetching",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await toolsApi.patchToolCategory({ id, data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const deleteToolCategory = createAsyncThunk(
  "tools/deleteToolCategoryFetching",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await toolsApi.deleteToolCategory({ id });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const getTools = createAsyncThunk(
  "tools/getToolsFetching",
  async (_, { rejectWithValue }) => {
    try {
      const response = await toolsApi.getTools();
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postTools = createAsyncThunk(
  "tools/postToolsFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await toolsApi.postTools({ data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const patchTools = createAsyncThunk(
  "tools/patchToolsFetching",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await toolsApi.patchTools({ id, data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const deleteTools = createAsyncThunk(
  "tools/deleteToolsFetching",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await toolsApi.deleteTools({ id });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

const initialState = {
  action: null,
  categories: {
    loading: "idle",
    items: [],
    error: null,
    isOpenModal: false,
    currentId: null,
  },
  tools: {
    loading: "idle",
    items: [],
    error: null,
    isOpenModal: false,
    currentId: null,
  },
};

const tools = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setAction: (state, action) => {
      state.action = action.payload;
    },
    setCategoriesModal: (state, action) => {
      state.categories.isOpenModal = action.payload;

      if (action.payload === false) {
        state.action = null;
        state.categories.currentId = null;
      }
    },
    setToolsModal: (state, action) => {
      state.tools.isOpenModal = action.payload;

      if (action.payload === false) {
        state.action = null;
        state.tools.currentId = null;
      }
    },
    setCategoriesCurrentId: (state, action) => {
      state.categories.currentId = action.payload;
    },
    setToolsCurrentId: (state, action) => {
      state.tools.currentId = action.payload;
    },
  },
  extraReducers: {
    [getToolCategories.pending]: (state, action) => {
      if (state.categories.loading === "idle") {
        state.categories.loading = "pending";
        state.categories.error = null;
      }
    },
    [getToolCategories.fulfilled]: (state, action) => {
      if (state.categories.loading === "pending") {
        state.categories.loading = "idle";
        state.categories.items = action.payload.data.categories;
      }
    },
    [getToolCategories.rejected]: (state, action) => {
      if (state.categories.loading === "pending") {
        state.categories.loading = "idle";
        state.categories.error = action.payload.data;
      }
    },

    [postToolCategories.pending]: (state, action) => {
      if (state.categories.loading === "idle") {
        state.categories.loading = "pending";
        state.categories.error = null;
      }
    },
    [postToolCategories.fulfilled]: (state, action) => {
      if (state.categories.loading === "pending") {
        state.categories.loading = "idle";
        state.categories.items.push(action.payload.data.category);
      }
    },
    [postToolCategories.rejected]: (state, action) => {
      if (state.categories.loading === "pending") {
        state.categories.loading = "idle";
        state.categories.error = action.payload.data;
      }
    },
    [patchToolCategory.pending]: (state, action) => {
      if (state.categories.loading === "idle") {
        state.categories.loading = "pending";
        state.categories.error = null;
      }
    },
    [patchToolCategory.fulfilled]: (state, action) => {
      if (state.categories.loading === "pending") {
        const category = action.payload.data.category;

        state.categories.loading = "idle";
        const index = state.categories.items.findIndex(
          (item) => item.id === category.id
        );
        state.categories.items[index] = category;
      }
    },
    [patchToolCategory.rejected]: (state, action) => {
      if (state.categories.loading === "pending") {
        state.categories.loading = "idle";
        state.categories.error = action.payload.data;
      }
    },

    [deleteToolCategory.pending]: (state, action) => {
      if (state.categories.loading === "idle") {
        state.categories.loading = "pending";
        state.categories.error = null;
      }
    },
    [deleteToolCategory.fulfilled]: (state, action) => {
      if (state.categories.loading === "pending") {
        state.categories.loading = "idle";
        state.categories.items = state.categories.items.filter(
          (item) => item.id !== action.meta.arg?.id
        );
      }
    },
    [deleteToolCategory.rejected]: (state, action) => {
      if (state.categories.loading === "pending") {
        state.categories.loading = "idle";
        state.categories.error = action.payload.data;
      }
    },

    // [getTools.pending]: (state, action) => {
    //   if (state.tools.loading === "idle") {
    //     state.tools.loading = "pending";
    //     state.tools.error = null;
    //   }
    // },
    // [getTools.fulfilled]: (state, action) => {
    //   if (state.tools.loading === "pending") {
    //     state.tools.loading = "idle";
    //     state.tools.items = action.payload.data.tools;
    //   }
    // },
    // [getTools.rejected]: (state, action) => {
    //   if (state.tools.loading === "pending") {
    //     state.tools.loading = "idle";
    //     state.tools.error = action.payload.data;
    //   }
    // },

    // Tools Here
    [getTools.pending]: (state, action) => {
      if (state.tools.loading === "idle") {
        state.tools.loading = "pending";
        state.tools.error = null;
      }
    },
    [getTools.fulfilled]: (state, action) => {
      if (state.tools.loading === "pending") {
        state.tools.loading = "idle";
        state.tools.items = action.payload.data.tools;
      }
    },
    [getTools.rejected]: (state, action) => {
      if (state.tools.loading === "pending") {
        state.tools.loading = "idle";
        state.tools.error = action.payload.data;
      }
    },

    [postTools.pending]: (state, action) => {
      if (state.tools.loading === "idle") {
        state.tools.loading = "pending";
        state.tools.error = null;
      }
    },
    [postTools.fulfilled]: (state, action) => {
      if (state.tools.loading === "pending") {
        state.tools.loading = "idle";
        state.tools.items.push(action.payload.data.tool);
      }
    },
    [postTools.rejected]: (state, action) => {
      if (state.tools.loading === "pending") {
        state.tools.loading = "idle";
        state.tools.error = action.payload.data;
      }
    },
    [patchTools.pending]: (state, action) => {
      if (state.tools.loading === "idle") {
        state.tools.loading = "pending";
        state.tools.error = null;
      }
    },
    [patchTools.fulfilled]: (state, action) => {
      if (state.tools.loading === "pending") {
        const tool = action.payload.data.tool;

        state.tools.loading = "idle";
        const index = state.tools.items.findIndex(
          (item) => item.id === tool.id
        );
        state.tools.items[index] = tool;
      }
    },
    [patchTools.rejected]: (state, action) => {
      if (state.tools.loading === "pending") {
        state.tools.loading = "idle";
        state.tools.error = action.payload.data;
      }
    },

    [deleteTools.pending]: (state, action) => {
      if (state.tools.loading === "idle") {
        state.tools.loading = "pending";
        state.tools.error = null;
      }
    },
    [deleteTools.fulfilled]: (state, action) => {
      if (state.tools.loading === "pending") {
        state.tools.loading = "idle";
        state.tools.items = state.tools.items.filter(
          (item) => item.id !== action.meta.arg?.id
        );
      }
    },
    [deleteTools.rejected]: (state, action) => {
      if (state.tools.loading === "pending") {
        state.tools.loading = "idle";
        state.tools.error = action.payload.data;
      }
    },
  },
});

export const {
  setAction,
  setCategoriesModal,
  setToolsModal,
  setCategoriesCurrentId,
  setToolsCurrentId,
} = tools.actions;

export const selectors = {
  getToolsContent: createSelector(
    (state) => state.tools,
    (tools) => tools
  ),

  getToolCategories: createSelector(
    (state) => state.tools.categories,
    (categories) => categories
  ),

  getTools: createSelector(
    (state) => state.tools.tools,
    (tools) => tools
  ),

  getCategoryById: (id) =>
    createSelector([selectors.getToolCategories], (categories) => {
      let currentId;

      if (id) {
        currentId = id;
      } else {
        currentId = categories.currentId;
      }

      const category = categories.items.find(
        (category) => category.id === currentId
      );

      return category;
    }),

  getToolById: (id) =>
    createSelector([selectors.getTools], (tools) => {
      let currentId;

      if (id) {
        currentId = id;
      } else {
        currentId = tools.currentId;
      }

      const tool = tools.items.find((tool) => tool.id === currentId);

      return tool;
    }),
};

export default tools.reducer;
