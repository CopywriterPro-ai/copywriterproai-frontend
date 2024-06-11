import dayjs from "dayjs";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import Layout from "./Layout";
import { UserHeader as Header } from "@/components/common/Header";
import { getToolsContent, getToolsCategory, selectors as contentSelector } from "@/redux/slices/content";
import { selectors as uiSelector } from "@/redux/slices/ui";
import { getFavouriteTools } from "@/redux/slices/user";
import { getOwnSubscriber } from "@/redux/slices/subscriber";
import { useUser, useAuth, useSubscriberModal } from "@/hooks";
import { SigninModal } from "@/components/modals/auth";
import { SubscriberModal, SubscriberAccessModal } from "@/components/modals/subscriber";
import Processing from "@/pages/processing";

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
  const [hasNavigated, setHasNavigated] = useState(false);
  const [requestFavourite, setRequestFavourite] = useState(true);
  const [requestSubscriber, setRequestSubscriber] = useState(true);
  const { isLoaded, isAuth, isRehydrated } = useAuth();
  const { userInfo: { id: userId, hasCompletedOnboarding = true }, subscribe } = useUser();
  const [subsModal] = useSubscriberModal();

  useEffect(() => {
    if (isRehydrated && !isAuth && !isSpecial && !hasNavigated) {
      router.replace("/signin");
      setHasNavigated(true);
    } else if (isAuth && !hasCompletedOnboarding && !hasNavigated) {
      router.replace("/app/onboarding");
      setHasNavigated(true);
    }
  }, [isAuth, isRehydrated, isSpecial, hasNavigated, hasCompletedOnboarding, router]);

  const {
    status: { fetchContent, fetchCategories },
  } = useSelector(contentSelector.getformContents());

  useEffect(() => {
    if (isLoaded && isAuth && requestFavourite && isRehydrated) {
      dispatch(getFavouriteTools({ userId })).then(({ payload }) => {
        if (payload.status === 200) {
          setRequestFavourite(false);
        }
      });
    }
  }, [dispatch, isAuth, isLoaded, isRehydrated, requestFavourite, userId]);

  useEffect(() => {
    if (isLoaded && isAuth && requestSubscriber && isRehydrated) {
      dispatch(getOwnSubscriber()).then(({ payload }) => {
        if (payload.status === 200) {
          setRequestSubscriber(false);
        }
      });
    }
  }, [dispatch, isAuth, isLoaded, isRehydrated, requestSubscriber]);

  useEffect(() => {
    if (!fetchCategories) {
      dispatch(getToolsCategory());
    }
  }, [dispatch, fetchCategories]);

  useEffect(() => {
    if (!fetchContent && fetchCategories) {
      dispatch(getToolsContent());
    }
  }, [dispatch, fetchContent, fetchCategories]);

  const { topBarHeigth, navBarHeigth, showTopBar } = useSelector(uiSelector.getHeaderSize);
  const { taskaccess } = useSelector(uiSelector.getModal);

  const redirectPath = useSelector(uiSelector.getRedirectPath);

  if (!isAuth && isRehydrated && !isSpecial) {
    return <Processing color="#000" />;
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
            topBarHeight={topBarHeigth}
            navBarHeight={navBarHeigth}
            showTopBar={showTopBar}
        >
          {children}
        </Main>
        {!isAuth && <SigninModal />}
        {subsModal.isOpen && <SubscriberModal />}
        {taskaccess.isOpen && <SubscriberAccessModal />}
      </Layout>
  );
};

const Main = styled.main`
  // height: 100vh;
`;

export default UserLayout;
