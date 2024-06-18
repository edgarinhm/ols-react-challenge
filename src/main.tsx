import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Login from "components/login/login";
import { routes } from "./routes";
import {
  AuthenticatedTemplate,
  AuthenticationProvider,
  BlockRouteReRenderAfterAuth,
  UnauthenticatedTemplate,
} from "common/authentication/authentication-provider";
import "common/sass/styles/base-elements.scss";
import "common/sass/styles/base-inputs.scss";
import { ApiBaseProvider } from "common/services/api/api-base";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => {
        resetErrorBoundary(error);
        return <></>;
      }}
      onReset={(error) => console.error(`Critical Application Error: ${error}`)}
    >
      <BrowserRouter>
        <AuthenticationProvider>
          <AuthenticatedTemplate>
            <ApiBaseProvider>
              <App />
            </ApiBaseProvider>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <ApiBaseProvider>
              <Routes>
                <Route path={routes.login.name} element={<Login />} />
                <Route
                  path={"*"}
                  element={
                    <BlockRouteReRenderAfterAuth>
                      <Navigate
                        to={{ pathname: routes.login.name }}
                        state={{
                          redirectUrl: window.location.href,
                        }}
                      />
                    </BlockRouteReRenderAfterAuth>
                  }
                />
              </Routes>
            </ApiBaseProvider>
          </UnauthenticatedTemplate>
        </AuthenticationProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
