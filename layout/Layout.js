import { Fragment } from "react";

import ToastContainer from "@/components/ToastContainer";
import { useScrollTop } from "@/hooks";

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
