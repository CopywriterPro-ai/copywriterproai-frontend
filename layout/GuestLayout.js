import Script from "next/script";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Processing from "@/pages/processing";
import Layout from "./Layout";
import { GuestHeader as Header } from "@/components/common/Header";
import { GuestFooter as Footer } from "@/components/common/Footer";
import { useUser } from "@/hooks";
import { USER_DEFAULT_PATH } from "@/appconstants";

const GuestLayout = ({
  children,
  title,
  description,
  otherSEO,
  additionalMeta,
}) => {
  const router = useRouter();
  const { isAuth, isRehydrated } = useUser();

  useEffect(() => {
    if (isAuth && isRehydrated) router.push(USER_DEFAULT_PATH);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, isRehydrated]);

  if (isAuth && isRehydrated) {
    return <Processing color='#000'/>;
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
      <Script
        strategy="afterInteractive"
        id="tawk-chat"
        dangerouslySetInnerHTML={{
          __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6232d3be1ffac05b1d7f032b/1fub8m943';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();`,
        }}
      />
    </Layout>
  );
};

export default GuestLayout;
