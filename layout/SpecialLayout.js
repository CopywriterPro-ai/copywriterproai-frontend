import React from "react";

import Layout from "./UserLayout";
import { useUser } from "@/hooks";

const SpecialLayout = ({
  children,
  title,
  description,
  otherSEO,
  additionalMeta,
}) => {
  const { isAuth } = useUser();
  return (
    <Layout
      isSpecial={isAuth ? false : true}
      title={title}
      description={description}
      otherSEO={otherSEO}
      additionalMeta={additionalMeta}
    >
      {children}
    </Layout>
  );
};

export default SpecialLayout;
