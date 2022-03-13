import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { getAllDocs, getDocByTask, getDocTasks } from "@/api/docs/app";
import { markdownToHtml } from "@/utils";
import GeneratingBox from "components/contentgenerate";
import { SpecialLayout as Layout } from "@/layout";
import { GenerateSidebar, MainSidebar } from "@/components/sidebar";
import { setCurrentActiveKeyState } from "@/redux/slices/content";
import { selectors as uiSelector } from "@/redux/slices/ui";
import { SubscriberModal } from "@/components/modals/subscriber";
import { useWindowSize, useSidebar } from "@/hooks";
import AppTaskModal from "@/components/modals/tutorial/apptask";

const AppItem = ({ doc }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showSidebar, showContent } = useSidebar();
  const showTutorialState = useState(false);
  const { query, isReady } = router;
  const { task } = query;
  const { subscriber } = useSelector(uiSelector.getModal);

  useEffect(() => {
    if (isReady && task) dispatch(setCurrentActiveKeyState(task));
  }, [dispatch, isReady, task]);

  const { width: windowWidth } = useWindowSize();

  return (
    <Layout>
      <div className="container-fluid">
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
              <div
                className={`col-lg-${windowWidth < 1600 ? "9" : "10"}`}
                style={{ position: "relative" }}
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
      <AppTaskModal
        content={doc?.content}
        showTutorialState={showTutorialState}
      />
      {subscriber?.usage && <SubscriberModal />}
    </Layout>
  );
};

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
