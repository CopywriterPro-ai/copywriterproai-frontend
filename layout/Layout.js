import ReactModal from "react-modal";
import Head from "@/components/common/Head";
import { Fragment } from "react";

import ToastContainer from "@/components/ToastContainer";
// import { useScrollTop } from "@/hooks";
import { isServer } from "@/utils";

if (!isServer) {
  ReactModal.setAppElement("#__next");
}

const Layout = ({ children, title, description, images, otherSEO, additionalMeta }) => {
  // useScrollTop();

  return (
    <Fragment>
      <Head
        title={title}
        description={description}
        images={images}
        otherSEO={otherSEO}
        additionalMeta={additionalMeta}
      />
      {children}
      <ToastContainer />
    </Fragment>
  );
};

export default Layout;
