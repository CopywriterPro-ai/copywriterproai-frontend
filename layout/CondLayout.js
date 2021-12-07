import React from "react";

import { useUser } from "@/hooks";
import UserLayout from "./UserLayout";
import GuestLayout from "./GuestLayout";

const CondLayout = ({
  children,
  title,
  description,
  otherSEO,
  additionalMeta,
}) => {
  const { isAuth } = useUser();

  if (isAuth) {
    return (
      <UserLayout
        title={title}
        description={description}
        otherSEO={otherSEO}
        additionalMeta={additionalMeta}
      >
        {children}
      </UserLayout>
    );
  } else {
    return (
      <GuestLayout
        title={title}
        description={description}
        otherSEO={otherSEO}
        additionalMeta={additionalMeta}
      >
        {children}
      </GuestLayout>
    );
  }
};

export default CondLayout;
