import { Suspense, type PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  FullscreenFallback,
  ErrorBoundaryFallback,
} from "./components/fallbacks";
import { App, ConfigProvider } from "antd";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { persistor, store } from "~/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { queryClient } from "~/api/query-client";
import { theme } from "~/utils/theme";
import { RefreshProvider } from "~/features/home/context/refresh-context";
// import { theme } from '~/styles/theme';

const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<FullscreenFallback />}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={ErrorBoundaryFallback}
          >
            {/* <GoogleOAuthProvider clientId="60376556833-gq2q948c8djo7jkid5pj8drngbnm60e5.apps.googleusercontent.com"> */}
            <GoogleOAuthProvider clientId="428101944380-iflj2orhfd9h1seq6raj315b90hfm0mq.apps.googleusercontent.com">
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <QueryClientProvider client={queryClient}>
                    <ConfigProvider theme={theme}>
                      <RefreshProvider>
                        <App>
                          <Router>{children}</Router>
                          {/* <ReactQueryDevtools
                            initialIsOpen={false}
                            position="left"
                          /> */}
                        </App>
                      </RefreshProvider>
                    </ConfigProvider>
                  </QueryClientProvider>
                </PersistGate>
              </Provider>
            </GoogleOAuthProvider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Suspense>
  );
};

export default AppProviders;
