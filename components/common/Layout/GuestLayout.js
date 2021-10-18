import { Fragment } from "react";

import { GuestHeader as Header } from "@components/common/Header";
import { GuestFooter as Footer } from "@components/common/Footer";

const GuestLayout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default GuestLayout;
