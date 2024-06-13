import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { authApi, userApi } from "@/api";
import { asyncThunkError } from "@/utils";

export const getMe = createAsyncThunk(
  "user/getMeFetching",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getMe();
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postUserRegister = createAsyncThunk(
  "auth/postUserRegisterFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await authApi.postUserRegister({ data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postUserVerify = createAsyncThunk(
  "auth/postUserVerifyFetching",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await authApi.postUserVerify({ token });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postUserLogin = createAsyncThunk(
  "auth/postUserLoginFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await authApi.postUserLogin({ data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postUserLogout = createAsyncThunk(
  "auth/postUserLogoutFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await authApi.postUserLogout({ data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postRefreshToken = createAsyncThunk(
  "auth/postRefreshTokenFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await authApi.postRefreshToken({ data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postForgotPassword = createAsyncThunk(
  "auth/postForgotPasswordFetching",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await authApi.postForgotPassword({ data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postResetPassword = createAsyncThunk(
  "auth/postResetPasswordFetching",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await authApi.postResetPassword({ token, data });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const postStrategyLogin = createAsyncThunk(
  "auth/postStrategyLoginFetching",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await authApi.postStrategyLogin({ token });
      return { data: response.data, status: response.status };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const updateCopyCounter = createAsyncThunk(
  "user/updateCopyCounterFetching",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.updateCopyCounter();
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const submitOpenAIApi = createAsyncThunk(
  "user/submitOpenAIApiFetching",
  async ({ ownOpenAIApiKey }, { rejectWithValue, dispatch }) => {
    try {
      const response = await userApi.submitOpenAIApi({
        data: { ownOpenAIApiKey },
      });
      await dispatch(complateOnboading());
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

export const completeOnboarding = createAsyncThunk(
  "user/completeOnboardingFetching",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.complateOnboading();
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return asyncThunkError(error, rejectWithValue);
    }
  }
);

const initialState = {
  auth: {
    loading: "idle",
    isAuth: false,
    accessToken: { token: null, expires: null },
    refreshToken: { token: null, expires: null },
    error: null,
  },
  info: {
    loading: "idle",
    data: { isLoaded: false },
    error: null,
  },
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state, action) => {
      return initialState;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.auth,
    }),
    [getMe.pending]: (state, action) => {
      if (state.info.loading === "idle") {
        state.info.loading = "pending";
        state.info.error = null;
      }
    },
    [getMe.fulfilled]: (state, action) => {
      if (state.info.loading === "pending") {
        state.info.loading = "idle";
        state.info.data = { ...action.payload.data.profile, isLoaded: true };
      }
    },
    [getMe.rejected]: (state, action) => {
      if (state.info.loading === "pending") {
        if (action.payload.status < 500) {
          return initialState;
        } else {
          state.info.loading = "idle";
          state.info.data.isLoaded = true;
          state.info.error = action.payload.data;
        }
      }
    },

    [postUserRegister.pending]: (state, action) => {
      if (state.auth.loading === "idle") {
        state.auth.loading = "pending";
        state.auth.error = null;
      }
    },
    [postUserRegister.fulfilled]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth.loading = "idle";
      }
    },
    [postUserRegister.rejected]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth.loading = "idle";
        state.auth.error = action.payload.data;
      }
    },
    [postUserVerify.pending]: (state, action) => {
      if (state.auth.loading === "idle") {
        state.auth.loading = "pending";
        state.auth.error = null;
      }
    },
    [postUserVerify.fulfilled]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth.loading = "idle";
      }
    },
    [postUserVerify.rejected]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth.loading = "idle";
        state.auth.error = action.payload.data;
      }
    },
    [postUserLogin.pending]: (state, action) => {
      if (state.auth.loading === "idle") {
        state.auth.loading = "pending";
        state.auth.error = null;
      }
    },
    [postUserLogin.fulfilled]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth.loading = "idle";
        state.info.data = { ...action.payload.data.user, isLoaded: true };
        state.auth.isAuth = true;
        state.auth.accessToken = action.payload.data.tokens.access;
        state.auth.refreshToken = action.payload.data.tokens.refresh;
      }
    },
    [postUserLogin.rejected]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth = { ...initialState.auth, error: action.payload.data };
      }
    },
    [postUserLogout.pending]: (state, action) => {
      if (state.auth.loading === "idle") {
        state.auth.loading = "pending";
        state.auth.error = null;
      }
    },
    [postUserLogout.fulfilled]: (state, action) => {
      if (state.auth.loading === "pending") {
        if (typeof window !== "undefined") {
          localStorage.clear();
        }
        return initialState;
      }
    },
    [postUserLogout.rejected]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth.loading = "idle";
        state.auth.error = action.payload.data;
      }
    },
    [postRefreshToken.pending]: (state, action) => {
      if (state.auth.loading === "idle") {
        state.auth.loading = "pending";
        state.auth.error = null;
      }
    },
    [postRefreshToken.fulfilled]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth.loading = "idle";
        state.auth.isAuth = true;
        state.auth.accessToken = action.payload.data.access;
        state.auth.refreshToken = action.payload.data.refresh;
      }
    },
    [postRefreshToken.rejected]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth.loading = "idle";
        state.auth.error = action.payload?.data;
      }
    },
    [postForgotPassword.pending]: (state, action) => {
      if (state.auth.loading === "idle") {
        state.auth.loading = "pending";
        state.auth.error = null;
      }
    },
    [postForgotPassword.fulfilled]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth.loading = "idle";
      }
    },
    [postForgotPassword.rejected]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth.loading = "idle";
        state.auth.error = action.payload.data;
      }
    },
    [postResetPassword.pending]: (state, action) => {
      if (state.auth.loading === "idle") {
        state.auth.loading = "pending";
        state.auth.error = null;
      }
    },
    [postResetPassword.fulfilled]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth.loading = "idle";
      }
    },
    [postResetPassword.rejected]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth.loading = "idle";
        state.auth.error = action.payload.data;
      }
    },
    [postStrategyLogin.pending]: (state, action) => {
      if (state.auth.loading === "idle") {
        state.auth.loading = "pending";
        state.auth.error = null;
      }
    },
    [postStrategyLogin.fulfilled]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth.loading = "idle";
        state.info.data = { ...action.payload.data.user, isLoaded: true };
        state.auth.isAuth = true;
        state.auth.accessToken = action.payload.data.tokens.access;
        state.auth.refreshToken = action.payload.data.tokens.refresh;
      }
    },
    [postStrategyLogin.rejected]: (state, action) => {
      if (state.auth.loading === "pending") {
        state.auth = { ...initialState.auth, error: action.payload.data };
      }
    },
    [updateCopyCounter.pending]: (state, action) => {
      if (state.info.loading === "idle") {
        state.info.loading = "pending";
        state.info.error = null;
      }
    },
    [updateCopyCounter.fulfilled]: (state, action) => {
      if (state.info.loading === "pending") {
        state.info.loading = "idle";
      }
    },
    [updateCopyCounter.rejected]: (state, action) => {
      if (state.info.loading === "pending") {
        state.info.loading = "idle";
        state.info.error = action.payload.data;
      }
    },
    [submitOpenAIApi.pending]: (state, action) => {
      if (state.info.loading === "idle") {
        state.info.loading = "pending";
        state.info.error = null;
      }
    },
    [submitOpenAIApi.fulfilled]: (state, action) => {
      if (state.info.loading === "pending") {
        state.info.loading = "idle";
      }
    },
    [submitOpenAIApi.rejected]: (state, action) => {
      if (state.info.loading === "pending") {
        state.info.loading = "idle";
        state.info.error = action.payload.data;
      }
    },

    [completeOnboarding.pending]: (state, action) => {
      if (state.info.loading === "idle") {
        state.info.loading = "pending";
        state.info.error = null;
      }
    },
    [completeOnboarding.fulfilled]: (state, action) => {
      if (state.info.loading === "pending") {
        state.info.loading = "idle";
        location.reload();
      }
    },
    [completeOnboarding.rejected]: (state, action) => {
      if (state.info.loading === "pending") {
        state.info.loading = "idle";
        state.info.error = action.payload.data;
      }
    },
  },
});

export const { resetAuthState } = auth.actions;

export const selectors = {
  getAuth: createSelector(
    (state) => state.auth,
    (data) => data
  ),

  getAuthenticate: createSelector(
    (state) => state.auth,
    (data) => data.auth
  ),

  getInfo: createSelector(
    (state) => state.auth,
    (data) => data.info.data
  ),
};

export default auth.reducer;
