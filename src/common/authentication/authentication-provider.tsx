import { ReactNode } from 'react';

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return <div>{children}</div>;
};

export const AuthenticatedTemplate = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element | null => {
  const isAuthenticated = sessionStorage.getItem('authenticated');
  return isAuthenticated ? <div>{children}</div> : null;
};

export const UnauthenticatedTemplate = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  return <>{children}</>;
};
