import React from "react";

import { useUser } from "@/hooks";
import UserLayout from "./UserLayout";
import GuestLayout from "./GuestLayout";

const CondLayout = ({ children, title, description, otherSEO }) => {
  const { isAuth } = useUser();

  if (isAuth) {
    return (
      <UserLayout title={title} description={description} otherSEO={otherSEO}>
        {children}
      </UserLayout>
    );
  } else {
    return (
      <GuestLayout title={title} description={description} otherSEO={otherSEO}>
        {children}
      </GuestLayout>
    );
  }
};

export default CondLayout;
