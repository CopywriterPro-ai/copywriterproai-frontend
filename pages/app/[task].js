import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { getAllDocs, getDocByTask } from "@/api/docs/app";
import { markdownToHtml } from "@/utils";
import GeneratingBox from "components/contentgenerate";
import { SpecialLayout as Layout } from "@/layout";
import { GenerateSidebar, MainSidebar } from "@/components/sidebar";
import { setCurrentActiveKeyState } from "@/redux/slices/content";
import { useWindowSize, useSidebar } from "@/hooks";
import AppTaskModal from "@/components/modals/tutorial/apptask";

import styled from "styled-components";

const AppItem = ({ doc }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showSidebar, showContent } = useSidebar();
  const showTutorialState = useState(false);
  const { query, isReady } = router;
  const { task } = query;

  useEffect(() => {
    if (isReady && task) dispatch(setCurrentActiveKeyState(task));
  }, [dispatch, isReady, task]);

  const { width: windowWidth } = useWindowSize();

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          {/* https://codepen.io/lpato/pen/bGKjEod */}
          {showSidebar && <MainSidebar />}
          {showContent && (
            <>
              <Sidebar
                className={`col-lg-${windowWidth < 1600 ? "3" : "2"}`}
              >
                <GenerateSidebar />
              </Sidebar>
              <div
                className={`col-lg-${windowWidth < 1600 ? "9" : "10"}`}
                style={{ position: "relative", padding: "0" }}
              >
                {task === "blog-writing" ? (
                  <p>Redirecting...</p>
                ) : (
                  <GeneratingBox showTutorialState={showTutorialState} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <AppTaskModal doc={doc} showTutorialState={showTutorialState} />
    </Layout>
  );
};

const Sidebar = styled.div`
  padding: 0px;
  border-right: 1px solid rgba(0,0,0,.1);

  @media(min-width: 992px) {
    min-height: 100vh;
  }
`;

export async function getStaticProps({ params }) {
  const doc = getDocByTask(params.task, ["title", "content", "seo"]);
  const content = await markdownToHtml(doc.content || "");

  return {
    props: {
      doc: {
        ...doc,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const docs = getAllDocs(["task"]);

  return {
    paths: docs.map((doc) => {
      return {
        params: {
          task: doc.task,
        },
      };
    }),
    fallback: false,
  };
}

export default AppItem;
