import { basename } from "./../constants/basename-constants";
import { LocalStorageKeys } from "common/enums/local-storage-keys";
import { OpenWindow } from "common/functions/windows-funtions";
import { GetSignInLogin, GetUser } from "common/services/login-service";
import { useSharedStorage } from "common/state-management/shared-storage";
import { useCallback } from "react";
import { routes } from "routes";

export const useAuthentication = (): {
  handleLoginRedirect: (redirectUrl: string) => Promise<void>;
  handleAuthenticatedRedirect: (redirectUrl: string) => Promise<void>;
  handleLogout: () => void;
  validateAuthenticateUser: (username: string, password: string) => Promise<boolean>;
} => {
  const { authenticated, updateStorage } = useSharedStorage((state) => ({
    authenticated: state.user?.id,
    updateStorage: state.updateStorage,
  }));

  const clearStorage = (): void => {
    localStorage.clear();
    sessionStorage.clear();
  };

  const handleLoginRedirect = useCallback(async (redirectUrl: string): Promise<void> => {
    OpenWindow(redirectUrl, "_self");
  }, []);

  const handleAuthenticatedRedirect = useCallback(
    async (redirectUrl: string): Promise<void> => {
      return authenticated ? OpenWindow(redirectUrl, "_self") : undefined;
    },
    [authenticated]
  );

  const validateAuthenticateUser = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      const loginData = await GetSignInLogin(username, password);
      const user = loginData[0];
      if (user) {
        const userData = await GetUser(user.id);
        updateStorage(LocalStorageKeys.user, userData[0]);
        return true;
      } else {
        return false;
      }
    },
    [updateStorage]
  );

  const handleLogout = useCallback((): void => {
    clearStorage();
    handleAuthenticatedRedirect(basename + routes.home.name);
  }, [handleAuthenticatedRedirect]);

  return {
    handleLoginRedirect,
    handleAuthenticatedRedirect,
    handleLogout,
    validateAuthenticateUser,
  };
};

export const useIsAuthenticated = () => {
  const { authenticated } = useSharedStorage((state) => ({
    authenticated: state.user?.id,
  }));
  return !!authenticated;
};
