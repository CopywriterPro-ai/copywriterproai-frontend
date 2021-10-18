import { Fragment } from "react";
import { UserHeader as Header } from "@components/common/Header";
import { UserFooter as Footer } from "@components/common/Footer";

const UserLayout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default UserLayout;
