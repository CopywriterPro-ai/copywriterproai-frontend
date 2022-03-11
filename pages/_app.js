import Script from "next/script";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import { useStore } from "react-redux";
import { ThemeProvider } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";
import { hotjar } from "react-hotjar";

import { wrapper } from "@/redux/store";
import { isClientDevMode, isProductionClient } from "@/utils";
import GlobalStyle from "@/styles";
import theme from "@/styles/theme";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/global.scss";

const ga4code = process.env.NEXT_PUBLIC_APP_GA4_CODE;

const App = ({ Component, pageProps, err }) => {
  useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);

  useEffect(() => {
    if (!isClientDevMode && isProductionClient)
      hotjar.initialize(
        process.env.NEXT_PUBLIC_APP_HOTJAR_ID,
        process.env.NEXT_PUBLIC_APP_HOTJAR_VERSION
      );
  }, []);

  const store = useStore();

  return (
    <>
      {!isClientDevMode && isProductionClient && (
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
        </>
      )}

      <GlobalStyle />
      <PersistGate loading={null} persistor={store.__persistor}>
        {() => (
          <ThemeProvider theme={theme}>
            <NextNProgress />
            <Component {...pageProps} err={err} />
          </ThemeProvider>
        )}
      </PersistGate>
    </>
  );
};

export default wrapper.withRedux(App);
