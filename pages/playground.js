import React from "react";
import { useRouter } from "next/router";
import { useQuill } from "react-quilljs";

import { useAppDispatch, wrapper } from "@/redux/store";
import { SpecialLayout as Layout } from "@/layout";

const Playground = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const quill = useQuill();

  console.log(quill);

  return (
    <Layout>
      <h1>Playground</h1>
      <div ref={quill.quillRef} />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    // console.log(ctx);
    // console.log(store);
  }
);

export default Playground;
