import fetcher from "./fetcher";

const auth = {
  postUserRegister: ({ data }) => {
    return fetcher("/auth/register", {
      method: "post",
      data,
    });
  },

  postUserVerify: ({ token }) => {
    return fetcher(`/auth/verify-account?token=${token}`, {
      method: "post",
    });
  },

  postUserLogin: ({ data }) => {
    return fetcher("/auth/login", {
      method: "post",
      data,
    });
  },

  postUserLogout: ({ data }) => {
    return fetcher("/auth/logout", {
      method: "post",
      data,
    });
  },

  postRefreshToken: ({ data }) => {
    return fetcher("/auth/refresh-tokens", {
      method: "post",
      data,
    });
  },

  postForgotPassword: ({ data }) => {
    return fetcher("/auth/forgot-password", {
      method: "post",
      data,
    });
  },

  postResetPassword: ({ token, data }) => {
    return fetcher(`/auth/reset-password?token=${token}`, {
      method: "post",
      data,
    });
  },

  postStrategyLogin: ({ token }) => {
    return fetcher(`/auth/strategy-login?token=${token}`, {
      method: "post",
    });
  },
};

export default auth;
