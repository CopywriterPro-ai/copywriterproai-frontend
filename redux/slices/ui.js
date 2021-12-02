import { createSlice, createSelector } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  sideBar: {
    bookmark: false,
  },

  modal: {
    update: {
      password: false,
      email: false,
      name: false,
    },
    blogs: {
      delete: false,
      reset: false,
    },
    subscriber: {
      usage: false,
      message: null,
    },
    auth: {
      signin: false,
    },
  },

  landingBanner: {
    items: [
      {
        id: 1,
        loading: "idle",
        input: [],
        output: [],
      },
    ],
  },

  contentSidebar: {
    open: false,
  },
  headerSize: {
    topBarHeigth: 0,
    navBarHeigth: 0,
    showTopBar: true,
  },
  redirectPath: null,
};

const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleBookmarkSidebar: (state, action) => {
      state.sideBar.bookmark = !state.sideBar.bookmark;
    },
    falseBookmarkSidebar: (state, action) => {
      state.sideBar.bookmark = false;
    },
    trueBookmarkSidebar: (state, action) => {
      state.sideBar.bookmark = true;
    },
    setUpdatePasswordModal: (state, action) => {
      state.modal.update.password = action.payload;
    },
    setUpdateEmailModal: (state, action) => {
      state.modal.update.email = action.payload;
    },
    setUpdateNameModal: (state, action) => {
      state.modal.update.name = action.payload;
    },
    setBlogDeleteModal: (state, action) => {
      state.modal.blogs.delete = action.payload;
    },
    setBlogResetModal: (state, action) => {
      state.modal.blogs.reset = action.payload;
    },
    setSubscriberUsageModal: (state, action) => {
      state.modal.subscriber.usage = action.payload.usage;
      if (action.payload.usage === true) {
        state.modal.subscriber.message = action.payload.message;
      } else {
        state.modal.subscriber.message = null;
      }
    },
    setSigninModal: (state, action) => {
      state.modal.auth.signin = action.payload;
    },
    setContentSidebar: (state, action) => {
      const bool = action.payload;
      if (bool.toString()) {
        state.contentSidebar.open = bool;
      } else {
        state.contentSidebar.open = !state.contentSidebar.open;
      }
    },
    setTopBarHeigth: (state, action) => {
      state.headerSize.topBarHeigth = action.payload;
    },
    setNavBarHeigth: (state, action) => {
      state.headerSize.navBarHeigth = action.payload;
    },
    setTopBarStatus: (state, action) => {
      state.headerSize.showTopBar = action.payload;
    },
    setRedirectPath: (state, action) => {
      state.redirectPath = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.ui,
    }),
  },
});

export const {
  toggleBookmarkSidebar,
  falseBookmarkSidebar,
  trueBookmarkSidebar,
  setUpdatePasswordModal,
  setUpdateEmailModal,
  setUpdateNameModal,
  setBlogDeleteModal,
  setBlogResetModal,
  setSubscriberUsageModal,
  setSigninModal,
  setContentSidebar,
  setTopBarHeigth,
  setNavBarHeigth,
  setTopBarStatus,
  setRedirectPath,
} = ui.actions;

export const selectors = {
  getUI: createSelector(
    (state) => state.ui,
    (data) => data
  ),

  getSidebar: createSelector(
    (state) => state.ui.sideBar,
    (data) => data
  ),

  getModal: createSelector(
    (state) => state.ui.modal,
    (modal) => modal
  ),
  getContentSidebar: createSelector(
    (state) => state.ui.contentSidebar,
    (contentSidebar) => contentSidebar
  ),
  getHeaderSize: createSelector(
    (state) => state.ui.headerSize,
    (headerSize) => headerSize
  ),
  getRedirectPath: createSelector(
    (state) => state.ui.redirectPath,
    (redirectPath) => redirectPath
  ),
};

export default ui.reducer;
