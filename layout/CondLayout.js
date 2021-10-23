import React from "react";

import { useUser } from "@/hooks";
import UserLayout from "./UserLayout";
import GuestLayout from "./GuestLayout";

const CondLayout = ({ children }) => {
  const { isAuth } = useUser();

  if (isAuth) {
    return <UserLayout>{children}</UserLayout>;
  } else {
    return <GuestLayout>{children}</GuestLayout>;
  }
};

export default CondLayout;
