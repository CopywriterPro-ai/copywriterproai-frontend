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
  const { isAuth, isRehydrated } = useUser();

  if (isAuth && isRehydrated) {
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
  } else if (isRehydrated) {
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
  } else {
    return <h4>Loading...</h4>;
  }
};

export default CondLayout;
