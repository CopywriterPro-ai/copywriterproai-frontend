import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "./Layout";
import { useUser } from "@/hooks";

const AuthLayout = ({
  children,
  title,
  description,
  otherSEO,
  additionalMeta,
}) => {
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
    <Layout
      title={title}
      description={description}
      otherSEO={otherSEO}
      additionalMeta={additionalMeta}
    >
      {children}
    </Layout>
  );
};

export default AuthLayout;
