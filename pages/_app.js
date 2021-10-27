import { useEffect } from "react";
import { useStore } from "react-redux";
import { ThemeProvider } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";
import GA4React from "ga-4-react";
import { hotjar } from "react-hotjar";

import { wrapper } from "@/redux/store";
import { isClientDevMode, isProductionClient } from "@/utils";
import GlobalStyle from "@/styles";
import theme from "@/styles/theme";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/global.scss";

const ga4react = new GA4React(process.env.NEXT_PUBLIC_APP_GA4_CODE);

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

  if (!isClientDevMode && isProductionClient) {
    ga4react.initialize().then(
      (ga4) => {
        ga4.pageview("path");
        ga4.gtag("event", "pageview", "path");
      },
      (err) => {
        console.error(err);
      }
    );
  }

  return (
    <>
      <GlobalStyle />
      <PersistGate loading={null} persistor={store.__persistor}>
        {() => (
          <ThemeProvider theme={theme}>
            <Component {...pageProps} err={err} />
          </ThemeProvider>
        )}
      </PersistGate>
    </>
  );
};

export default wrapper.withRedux(App);
