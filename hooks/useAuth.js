import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { isExpiresToken } from "@/utils";
import { usePageIsVisible, useNetwork, useUser } from "@/hooks";
import {
  getMe,
  resetAuthState,
  postRefreshToken,
  postUserLogout,
} from "@/redux/slices/auth";

const useAuth = () => {
  const dispatch = useDispatch();
  const isVisible = usePageIsVisible();
  const isOnline = useNetwork();
  const [requestAccess, setRequestAccess] = useState(true);
  const [requestUser, setRequestUser] = useState(true);

  const {
    isAuth,
    isRehydrated,
    authToken: { accessToken, refreshToken },
    userInfo: { isLoaded },
  } = useUser();

  useEffect(() => {
    const interval = setInterval(() => {
      const accessExpire = isExpiresToken(accessToken.expires);
      if (isAuth && isVisible && isOnline && requestAccess && accessExpire) {
        setRequestAccess(false);
        dispatch(
          postRefreshToken({ data: { refreshToken: refreshToken.token } })
        )
          .then(({ payload }) => {
            if (payload.status === 200) {
              setRequestAccess(true);
            } else if (payload.status > 400 && payload.status < 500) {
              throw Error();
            } else {
              setRequestAccess(true);
            }
          })
          .catch((err) => {
            dispatch(resetAuthState());
          });
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, requestAccess, isOnline, isVisible, accessToken.expires]);

  useEffect(() => {
    const refreshExpire = isExpiresToken(refreshToken.expires);
    if (isAuth && isVisible && isOnline && refreshExpire) {
      dispatch(postUserLogout({ data: { refreshToken: refreshToken.token } }))
        .then(({ payload }) => {
          if (payload.status === 204) {
            console.warn("user logout");
          } else {
            throw Error();
          }
        })
        .catch((err) => {
          dispatch(resetAuthState());
        });
    }
  }, [dispatch, refreshToken, isOnline, isVisible, isAuth]);

  useEffect(() => {
    const accessExpire = isExpiresToken(accessToken.expires);
    if (isAuth && requestUser && !accessExpire)
      dispatch(getMe()).then(({ payload }) => {
        if (payload.status === 200) {
          setRequestUser(false);
        }
      });
  }, [accessToken.expires, dispatch, isAuth, requestUser]);

  return { isLoaded: isLoaded ? true : false, isAuth, isRehydrated };
};

export default useAuth;
