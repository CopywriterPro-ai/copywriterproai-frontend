import React from "react";

import Layout from "./Layout";
import { UserHeader as Header } from "@/components/common/Header";
import { UserFooter as Footer } from "@/components/common/Footer";

const UserLayout = ({ children }) => {
  return (
    <Layout>
      <Header />
      <main>{children}</main>
      <Footer />
    </Layout>
  );
};

export default UserLayout;
