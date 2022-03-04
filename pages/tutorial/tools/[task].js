import React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllDocs, getDocByTask } from "@/api/docs/app";
import { markdownToHtml } from "@/utils";

const AppTutorial = ({ doc }) => {
  const router = useRouter();
  if (!router.isFallback && !doc?.content) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      <h4>Hello World</h4>
      <div dangerouslySetInnerHTML={{ __html: doc.content }}></div>
    </div>
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

export default AppTutorial;
