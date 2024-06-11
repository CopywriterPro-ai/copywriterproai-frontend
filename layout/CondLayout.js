import React from "react";

import { useUser } from "@/hooks";
import UserLayout from "./UserLayout";
import GuestLayout from "./GuestLayout";
import Processing from "@/pages/Loading";

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
    return <Processing color="#000" />;
  }
};

export default CondLayout;
