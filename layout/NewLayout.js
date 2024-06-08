import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Processing from "@/pages/processing";
import Layout from "./Layout";
import Header from "@/components/common/Header/GuestHeader";
import Footer from "@/components/common/Footer/GuestFooter";
import { useUser } from "@/hooks";
import { USER_DEFAULT_PATH } from "@/appconstants";

const NewLayout = ({
  children,
  title,
  description,
  otherSEO,
  additionalMeta,
}) => {
  const router = useRouter();
  const {
    isAuth,
    isRehydrated,
    userInfo: { hasCompletedOnboarding = true },
  } = useUser();

  useEffect(() => {
    if (isAuth && isRehydrated) router.push(USER_DEFAULT_PATH);
    else if (isAuth && !hasCompletedOnboarding) {
      router.push("/app/onboading");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, isRehydrated, hasCompletedOnboarding]);

  if (isAuth && isRehydrated) {
    return <Processing color="#000" />;
  }

  return (
    <Layout
      title={title}
      description={description}
      otherSEO={otherSEO}
      additionalMeta={additionalMeta}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </Layout>
  );
};

export default NewLayout;
