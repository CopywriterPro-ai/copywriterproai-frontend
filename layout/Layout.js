import ReactModal from "react-modal";
import { Fragment } from "react";

import ToastContainer from "@/components/ToastContainer";
import { useScrollTop } from "@/hooks";
import { isServer } from "@/utils";

if (!isServer) {
  ReactModal.setAppElement("#__next");
}

const Layout = ({ children }) => {
  useScrollTop();

  return (
    <Fragment>
      {children}
      <ToastContainer />
    </Fragment>
  );
};

export default Layout;
