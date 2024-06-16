import { useSharedStorage } from "common/state-management/shared-storage";
import { ReactNode } from "react";

export const AuthenticationProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  return <div>{children}</div>;
};

export const AuthenticatedTemplate = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element | null => {
  const authenticated = useSharedStorage((state) => state.user?.id);
  return authenticated ? <div>{children}</div> : null;
};

export const UnauthenticatedTemplate = ({ children }: { children?: ReactNode }): JSX.Element => {
  return <>{children}</>;
};
