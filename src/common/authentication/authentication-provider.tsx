import { useSharedStorage } from "common/state-management/shared-storage";
import { ReactNode } from "react";
import { useIsAuthenticated } from "./authentication";

/**
 *Create a context to use is authenticated from local-storage
 */
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

export const UnAuthenticatedTemplate = ({ children }: { children?: ReactNode }): JSX.Element => {
  return <>{children}</>;
};

// this is necessary to stop Navigate from running during or
// just after msal has finished validation due to component re-rendering
export const BlockRouteReRenderAfterAuth = (props: ChildfullComponent): JSX.Element => {
  const authenticated = useIsAuthenticated();
  return !authenticated ? <>{props.children}</> : <></>;
};
