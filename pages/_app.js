import { useEffect } from "react";
import { useStore } from "react-redux";
import { ThemeProvider } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";

import { wrapper } from "@/redux/store";
import GlobalStyle from "@/styles";
import theme from "@/styles/theme";
import Head from "@/components/common/Head";
import "bootstrap/dist/css/bootstrap.min.css";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);

  const store = useStore();

  return (
    <>
      <Head />
      <GlobalStyle />
      <PersistGate loading={null} persistor={store.__persistor}>
        {() => (
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        )}
      </PersistGate>
    </>
  );
};

export default wrapper.withRedux(App);
