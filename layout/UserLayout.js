// import Script from "next/script";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";

import Layout from "./Layout";
import { UserHeader as Header } from "@/components/common/Header";
import {
  getToolsContent,
  getToolsCategory,
  selectors as contentSelector,
} from "@/redux/slices/content";
import { selectors as uiSelector } from "@/redux/slices/ui";
import { getFavouriteTools } from "@/redux/slices/user";
import { getOwnSubscriber } from "@/redux/slices/subscriber";
import { useUser, useAuth, useSubscriberModal } from "@/hooks";
import { SigninModal } from "@/components/modals/auth";
import {
  SubscriberModal,
  SubscriberAccessModal,
} from "@/components/modals/subscriber";

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
  const [requestFavourite, setRequestFavourite] = useState(true);
  const [requestSubscriber, setRequestSubscriber] = useState(true);
  const { isLoaded, isAuth, isRehydrated } = useAuth();
  const {
    userInfo: { id: userId },
    subscribe,
  } = useUser();
  const [subsModal] = useSubscriberModal();

  useEffect(() => {
    const subscriptionExpire =
      subscribe?.activeSubscription?.subscriptionExpire || null;
    const hasExpire = dayjs(subscriptionExpire).isValid();
    if (isAuth && isRehydrated && !hasExpire) {
      router.push("/pricing");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, isRehydrated, subscribe?.activeSubscription?.expire]);

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
        topBarHeigth={topBarHeigth}
        navBarHeigth={navBarHeigth}
        showTopBar={showTopBar}
      >
        {children}
      </Main>
      {!isAuth && <SigninModal />}
      {/* <Script
        id="chat-us-with-tawk"
        dangerouslySetInnerHTML={{
          __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6232d3be1ffac05b1d7f032b/1fucb8rjn';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
              `,
        }}
      ></Script> */}
      {subsModal.isOpen && <SubscriberModal />}
      {taskaccess.isOpen && <SubscriberAccessModal />}
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
