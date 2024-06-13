import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Login from 'components/login/login';
import { routes } from './routes';
import {
  AuthenticatedTemplate,
  AuthenticationProvider,
  UnauthenticatedTemplate,
} from 'common/authentication/authentication-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary
        FallbackComponent={({ error, resetErrorBoundary }) => {
          resetErrorBoundary(error);
          return <></>;
        }}
        onReset={(error) =>
          console.error(`Critical Application Error: ${error}`)
        }
      >
        <AuthenticationProvider>
          <AuthenticatedTemplate>
            <App />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Routes>
              <Route path={routes.login.name} element={<Login />} />
              <Route
                path={'*'}
                element={
                  <Navigate
                    to={{ pathname: routes.login.name }}
                    state={{
                      redirectUrl: window.location.href,
                    }}
                  />
                }
              />
            </Routes>
          </UnauthenticatedTemplate>
        </AuthenticationProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
