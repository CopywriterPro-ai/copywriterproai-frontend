import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";

import Layout from "./Layout";
import { UserHeader as Header } from "@/components/common/Header";
import { UserFooter as Footer } from "@/components/common/Footer";
import {
  getToolsContent,
  getToolsCategory,
  selectors as contentSelector,
} from "@/redux/slices/content";
import { selectors as uiSelector } from "@/redux/slices/ui";
import { getFavouriteTools } from "@/redux/slices/user";
import { getOwnSubscriber } from "@/redux/slices/subscriber";
import { useUser, useAuth } from "@/hooks";
import { SigninModal } from "@/components/modals/auth";

const UserLayout = ({
  children,
  isSpecial = false,
  title,
  description,
  otherSEO,
  additionalMeta,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [requestFavourite, setRequestFavourite] = useState(true);
  const [requestSubscriber, setRequestSubscriber] = useState(true);
  const { isLoaded, isAuth, isRehydrated } = useAuth();
  const {
    userInfo: { id: userId },
  } = useUser();

  useEffect(() => {
    if (isRehydrated && !isAuth && !isSpecial) router.push("/signin");
  }, [isAuth, isRehydrated, isSpecial, router]);

  const {
    status: { fetchContent, fetchCategories },
  } = useSelector(contentSelector.getformContents());

  useEffect(() => {
    if (isLoaded && isAuth && requestFavourite && isRehydrated)
      dispatch(getFavouriteTools({ userId })).then(({ payload }) => {
        if (payload.status === 200) {
          setRequestFavourite(false);
        }
      });
  }, [dispatch, isAuth, isLoaded, isRehydrated, requestFavourite, userId]);

  useEffect(() => {
    if (isLoaded && isAuth && requestSubscriber && isRehydrated)
      dispatch(getOwnSubscriber()).then(({ payload }) => {
        if (payload.status === 200) {
          setRequestSubscriber(false);
        }
      });
  }, [dispatch, isAuth, isLoaded, isRehydrated, requestSubscriber]);

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

  if (!isAuth && isRehydrated && !isSpecial) {
    return <h4>Redirecting...</h4>;
  }

  return (
    <Layout
      title={title}
      description={description}
      otherSEO={otherSEO}
      additionalMeta={additionalMeta}
    >
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
