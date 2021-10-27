import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";

import Layout from "./Layout";
import { UserHeader as Header } from "@/components/common/Header";
import { UserFooter as Footer } from "@/components/common/Footer";
import {
  getMe,
  resetAuthState,
  postRefreshToken,
  postUserLogout,
} from "@/redux/slices/auth";
import {
  getToolsContent,
  getToolsCategory,
  selectors as contentSelector,
} from "@/redux/slices/content";
import { selectors as uiSelector } from "@/redux/slices/ui";
import { getFavouriteTools } from "@/redux/slices/user";
import { getOwnSubscriber } from "@/redux/slices/subscriber";
import { isExpiresToken } from "@/utils";
import { usePageIsVisible, useNetwork, useUser } from "@/hooks";
import { SigninModal } from "@/components/modals/auth";

const UserLayout = ({
  children,
  isSpecial = false,
  title,
  description,
  otherSEO,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const visible = usePageIsVisible();
  const isOnline = useNetwork();
  const [requestAccess, setRequestAccess] = useState(true);
  const [requestUser, setRequestUser] = useState(true);
  const [requestFavourite, setRequestFavourite] = useState(true);
  const [requestSubscriber, setRequestSubscriber] = useState(true);

  const {
    isAuth,
    authToken: { accessToken, refreshToken },
    userInfo: { id: userId, role },
  } = useUser();

  const {
    status: { fetchContent, fetchCategories },
  } = useSelector(contentSelector.getformContents());

  useEffect(() => {
    if (!isSpecial && !isAuth) router.push("/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  useEffect(() => {
    const interval = setInterval(() => {
      const accessExpire = isExpiresToken(accessToken.expires);
      if (isAuth && visible && isOnline && requestAccess && accessExpire) {
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
  }, [dispatch, requestAccess, isOnline, visible]);

  useEffect(() => {
    const refreshExpire = isExpiresToken(refreshToken.expires);
    if (isAuth && visible && isOnline && refreshExpire) {
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
  }, [dispatch, refreshToken, isOnline, visible, isAuth]);

  useEffect(() => {
    const accessExpire = isExpiresToken(accessToken.expires);
    if (isAuth && requestUser && !accessExpire)
      dispatch(getMe()).then(({ payload }) => {
        if (payload.status === 200) {
          setRequestUser(false);
        }
      });
  }, [accessToken.expires, dispatch, isAuth, requestUser]);

  useEffect(() => {
    const accessExpire = isExpiresToken(accessToken.expires);
    if (isAuth && requestFavourite && !accessExpire)
      dispatch(getFavouriteTools({ userId })).then(({ payload }) => {
        if (payload.status === 200) {
          setRequestFavourite(false);
        }
      });
  }, [accessToken.expires, dispatch, requestFavourite, userId, isAuth]);

  useEffect(() => {
    const accessExpire = isExpiresToken(accessToken.expires);
    if (isAuth && requestSubscriber && !accessExpire)
      dispatch(getOwnSubscriber()).then(({ payload }) => {
        if (payload.status === 200) {
          setRequestSubscriber(false);
        }
      });
  }, [accessToken.expires, dispatch, requestSubscriber, isAuth]);

  useEffect(() => {
    if (!fetchCategories) {
      dispatch(getToolsCategory());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!fetchContent && fetchCategories) {
      dispatch(getToolsContent());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fetchCategories]);

  const { topBarHeigth, navBarHeigth, showTopBar } = useSelector(
    uiSelector.getHeaderSize
  );

  const redirectPath = useSelector(uiSelector.getRedirectPath);

  if (!isSpecial && !isAuth) {
    return <h4>Redirecting...</h4>;
  }

  return (
    <Layout title={title} description={description} otherSEO={otherSEO}>
      <Header />
      <Main
        topBarHeigth={topBarHeigth}
        navBarHeigth={navBarHeigth}
        showTopBar={showTopBar}
      >
        {children}
      </Main>
      <Footer />
      {!isAuth && <SigninModal />}
    </Layout>
  );
};

const Main = styled.main`
  min-height: 70vh;
  @media (min-width: 768px) {
    margin-top: ${({ topBarHeigth, navBarHeigth, showTopBar }) =>
      showTopBar.toString() === "true"
        ? `${topBarHeigth + navBarHeigth}px`
        : `${navBarHeigth}px`};
  }
`;

export default UserLayout;
