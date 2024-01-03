import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { lightTheme } from "../src/theme";
import createCache from "@emotion/cache";
import Head from "next/head";
import { NoSsr } from "@mui/material";
import { Provider, useSelector } from "react-redux";
import { store } from "@redux/Redux/Store";
import { SessionProvider } from "next-auth/react";
import AppCommonActionsWrapper from "@components/common/appCommonActionsWrapper";
import PrivateRoute from "../src/ProtectedRoute/PrivateRoute";
import { ThemeProvider } from "@mui/material/styles";

export const muiCache = createCache({
  key: "mui",
  prepend: true,
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      {/* <Head>
        <title>{pageProps.pageTitle || "MyRcloud"}</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta name="theme-color" content={lightTheme.palette.primary.main} />
        <link rel="shortcut icon" href="/favicon.ico"></link>
      </Head> */}
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta
          name="facebook-domain-verification"
          content="3uj5fa14cncu5q7m7381owbjkjv59l"
        />
      </Head>
      <ThemeProvider theme={lightTheme}>
        <Provider store={store}>
          <NoSsr>
            <AppCommonActionsWrapper />
            <PrivateRoute>
              <SessionProvider session={session}>
                <Component {...pageProps} />
              </SessionProvider>
            </PrivateRoute>
          </NoSsr>
          <ToastContainer />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
