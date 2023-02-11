import React from 'react';
import Layout from '@/layout/Layout';
import Footer from '@/layout/Footer/Footer';
import Navbar from '@/layout/Header/Navbar';
import TutorialHeader from '@/components/tutorial/TutorialHeader';
import TutorialDetails from '@/components/tutorial/TutorialDetails';

import { getAllDocs, getDocByTask } from "@/api/docs/app";
import { markdownToHtml } from "@/utils";

import { tutorial as metaData } from '@/utils/metaData';
import { tutorial as pageHeader } from '@/utils/pageHeader';

const AppTutorial = ({ doc }) => {
  return (
    <Layout title={metaData.title} description={metaData.description}>
      <Navbar />
      <TutorialHeader title={pageHeader.title} description={pageHeader.description}/>
      <TutorialDetails doc={doc}/>
      <Footer />
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

export default AppTutorial;
