import { instance as axiosInstance } from "@/api/fetcher";

const auth =
  ({ getState }) =>
  (next) =>
  (action) => {
    const {
      isAuth,
      accessToken: { token },
    } = getState().auth.auth;

    if (isAuth && token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    next(action);
  };

export default auth;
