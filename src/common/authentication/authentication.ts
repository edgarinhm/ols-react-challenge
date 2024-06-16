import { LocalStorageKeys } from "common/enums/local-storage-keys";
import { OpenWindow } from "common/functions/windows-funtions";
import { GetSignInLogin, GetUser } from "common/services/login-service";
import { useSharedStorage } from "common/state-management/shared-storage";
import { useCallback } from "react";
import { routes } from "routes";
import { shallow } from "zustand/shallow";

export const useAuthentication = (): {
  handleLoginRedirect: (redirectUrl: string) => Promise<void>;
  handleAuthenticatedRedirect: (redirectUrl: string) => Promise<void>;
  handleLogout: () => void;
  validateAuthenticateUser: (username: string, password: string) => Promise<boolean>;
} => {
  const {} = useSharedStorage((state) => (state.user?.id, state.updateStorage), shallow);

  const { authenticated, updateStorage } = useSharedStorage(
    (state) => ({
      authenticated: state.user?.id,
      updateStorage: state.updateStorage,
    }),
    shallow
  );

  const clearStorage = (): void => {
    localStorage.clear();
    sessionStorage.clear();
  };
  const handleLogout = useCallback((): void => {
    clearStorage();
    handleAuthenticatedRedirect(routes.login.name);
  }, [clearStorage]);

  const handleLoginRedirect = useCallback(async (redirectUrl: string): Promise<void> => {
    OpenWindow(redirectUrl, "_self");
  }, []);

  const handleAuthenticatedRedirect = useCallback(
    async (redirectUrl: string): Promise<void> => {
      return !!authenticated ? OpenWindow(redirectUrl, "_self") : undefined;
    },
    [authenticated]
  );

  const validateAuthenticateUser = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      const login = await GetSignInLogin(username, password);
      const user = login.find((user) => user.password === password && user.user === username);
      if (user) {
        const userData = await GetUser(user.id);
        updateStorage(LocalStorageKeys.user, userData);
        return true;
      } else {
        return false;
      }
    },
    []
  );

  return {
    handleLoginRedirect,
    handleAuthenticatedRedirect,
    handleLogout,
    validateAuthenticateUser,
  };
};
