import React from "react";

import Layout from "./Layout";
import { GuestHeader as Header } from "@/components/common/Header";
import { GuestFooter as Footer } from "@/components/common/Footer";

const GuestLayout = ({ children }) => {
  return (
    <Layout>
      <Header />
      <main>{children}</main>
      <Footer />
    </Layout>
  );
};

export default GuestLayout;
