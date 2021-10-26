import React from "react";

import Layout from "./UserLayout";
import { useUser } from "@/hooks";

const SpecialLayout = ({ children }) => {
  const { isAuth } = useUser();
  return <Layout isSpecial={isAuth ? false : true}>{children}</Layout>;
};

export default SpecialLayout;
