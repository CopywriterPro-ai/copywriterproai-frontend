import Script from "next/script";
// import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "react-redux";
import { ThemeProvider } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";
import { hotjar } from "react-hotjar";

import { wrapper } from "@/redux/store";
import { isClientDevMode, isProductionClient } from "@/utils";
import * as fbq from "@/utils/fpixel";
import GlobalStyle from "@/styles";
import theme from "@/styles/theme";
// import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/global.scss";

// import '@/assets/css/bootstrap.min.css';
import '@/assets/fonts/fontawesome-all.min.css';
import '@/assets/scss/main.scss';

// Import Swiper style
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

//Modal Video
import 'react-modal-video/scss/modal-video.scss';

const ga4code = process.env.NEXT_PUBLIC_APP_GA4_CODE;

const App = ({ Component, pageProps, err }) => {
  const router = useRouter();

  const isProduction = !isClientDevMode && isProductionClient;

  useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);

  useEffect(() => {
    isProduction && fbq.pageview();

    const handleRouteChange = () => {
      isProduction && fbq.pageview();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [isProduction, router.events]);

  useEffect(() => {
    if (isProduction)
      hotjar.initialize(
        process.env.NEXT_PUBLIC_APP_HOTJAR_ID,
        process.env.NEXT_PUBLIC_APP_HOTJAR_VERSION
      );
  }, [isProduction]);

  const store = useStore();

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossOrigin="anonymous"
      ></Script>
      {isProduction && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4code}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${ga4code}');
        `}
          </Script>
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
            }}
          />
          <Script id="rewardful-affiliate" strategy="afterInteractive">
            {`(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`}
          </Script>

          <Script
            strategy="afterInteractive"
            src="https://r.wdfl.co/rw.js"
            data-rewardful="d9f50a"
          ></Script>
        </>
      )}

      <GlobalStyle />
      <PersistGate loading={null} persistor={store.__persistor}>
        {() => (
          <ThemeProvider theme={theme}>
            {/* <NextNProgress /> */}
            <Component {...pageProps} err={err} />
          </ThemeProvider>
        )}
      </PersistGate>
    </>
  );
};

export default wrapper.withRedux(App);
