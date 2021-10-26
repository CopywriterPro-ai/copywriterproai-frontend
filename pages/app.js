import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { SpecialLayout as Layout } from "@/layout";
import { GenerateSidebar, MainSidebar } from "@/components/sidebar";
import GeneratingBox from "components/contentgenerate";
import { useSidebar } from "hooks";
import {
  setCurrentActiveKeyState,
  selectors as contentSelector,
} from "@/redux/slices/content";
import { selectors as uiSelector } from "@/redux/slices/ui";
import { SubscriberModal } from "components/modals/subscriber";
import { useWindowSize } from "@/hooks";

const App = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showSidebar, showContent } = useSidebar();

  const { tool } = router.query;
  const activeKey = useSelector(contentSelector.getCurrentActiveKey());
  const { subscriber } = useSelector(uiSelector.getModal);

  useEffect(() => {
    if (tool) dispatch(setCurrentActiveKeyState(tool));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (activeKey) {
      router.push({
        pathname: "/app",
        query: `tool=${activeKey}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

  useEffect(() => {
    if (!tool) {
      router.push({
        pathname: "/app",
        query: `tool=${activeKey}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey, tool]);

  const { width: windowWidth } = useWindowSize();

  return (
    <Layout>
      <Container className="container-fluid">
        <div className="row">
          {showSidebar && <MainSidebar />}
          {showContent && (
            <>
              <div
                className={`col-lg-${windowWidth < 1600 ? "3" : "2"}`}
                style={{
                  paddingTop: "15px",
                  borderRight: "1px solid rgba(0,0,0,.1)",
                }}
              >
                <GenerateSidebar />
              </div>
              <div className={`col-lg-${windowWidth < 1600 ? "9" : "10"}`}>
                <GeneratingBox />
              </div>
            </>
          )}
        </div>
      </Container>
      {subscriber?.usage && <SubscriberModal />}
    </Layout>
  );
};

const Container = styled.div``;

export default App;
