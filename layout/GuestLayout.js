import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "./Layout";
import { GuestHeader as Header } from "@/components/common/Header";
import { GuestFooter as Footer } from "@/components/common/Footer";
import { useUser } from "@/hooks";

const GuestLayout = ({ children, title, description, otherSEO }) => {
  const router = useRouter();
  const { isAuth } = useUser();

  useEffect(() => {
    if (isAuth) router.push("/app");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  if (isAuth) {
    return <h4>Redirecting...</h4>;
  }

  return (
    <Layout title={title} description={description} otherSEO={otherSEO}>
      <Header />
      <main>{children}</main>
      <Footer />
    </Layout>
  );
};

export default GuestLayout;
