import Processing from "@/pages/processing";

import { useEffect } from "react";
import { useRouter } from "next/router";

import { useUser } from "@/hooks";
import UserLayout from "./UserLayout";
import { USER_DEFAULT_PATH } from "@/appconstants";

const AdminLayout = ({
  children,
  title,
  description,
  otherSEO,
  additionalMeta,
}) => {
  const { push } = useRouter();
  const { isAuth, isRehydrated, userInfo } = useUser();

  useEffect(() => {
    if (
      isAuth &&
      isRehydrated &&
      userInfo.role !== "admin" &&
      userInfo.isLoaded
    ) {
      push(USER_DEFAULT_PATH);
    }
  }, [isAuth, isRehydrated, push, userInfo.isLoaded, userInfo.role]);

  if (
    isAuth &&
    isRehydrated &&
    userInfo.role !== "admin" &&
    userInfo.isLoaded
  ) {
    return <Processing color='#000'/>;
  }

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
};

export default AdminLayout;
