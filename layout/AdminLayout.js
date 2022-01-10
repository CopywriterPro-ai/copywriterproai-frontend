import { useEffect } from "react";
import { useRouter } from "next/router";

import { useUser } from "@/hooks";
import UserLayout from "./UserLayout";

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
      push("/app");
    }
  }, [isAuth, isRehydrated, push, userInfo.isLoaded, userInfo.role]);

  if (
    isAuth &&
    isRehydrated &&
    userInfo.role !== "admin" &&
    userInfo.isLoaded
  ) {
    return <h4>Redirecting</h4>;
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
