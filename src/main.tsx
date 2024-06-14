import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Login from 'components/login/login';
import { routes } from './routes';
import {
  AuthenticatedTemplate,
  AuthenticationProvider,
  UnauthenticatedTemplate,
} from 'common/authentication/authentication-provider';
import NotMatch from 'components/not-match/not-match';
import 'common/sass/styles/base-elements.scss';
import 'common/sass/styles/base-inputs.scss';

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
              <Route path="*" element={<NotMatch />} />
            </Routes>
          </UnauthenticatedTemplate>
        </AuthenticationProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
