import { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
// import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "@/redux/store";
import GlobalStyle from "@/styles";
import theme from "@/styles/theme";
import Head from "@/components/common/Head";
// import "@/styles/all.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);

  return (
    <>
      <Head />
      <GlobalStyle />
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
        {/* </PersistGate> */}
      </Provider>
    </>
  );
};

export default App;
