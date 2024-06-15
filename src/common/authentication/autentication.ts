import { OpenWindow } from 'common/functions/windows-funtions';
import { GetSignInLogin, GetUser } from 'common/services/login-service';
import { useCallback } from 'react';

export const useAuthentication = (): {
  handleLoginRedirect: (redirectUrl: string) => Promise<void>;
  handleAuthenticatedRedirect: (redirectUrl: string) => Promise<void>;
  handleLogout: () => void;
  validateAuthenticateUser: (
    username: string,
    password: string
  ) => Promise<boolean>;
} => {
  const clearStorage = (): void => {
    localStorage.clear();
    sessionStorage.clear();
  };
  const handleLogout = useCallback((): void => {
    clearStorage();
  }, [clearStorage]);

  const handleLoginRedirect = useCallback(
    async (redirectUrl: string): Promise<void> => {
      OpenWindow(redirectUrl, '_self');
    },
    []
  );

  const handleAuthenticatedRedirect = useCallback(
    async (redirectUrl: string): Promise<void> => {
      return !!sessionStorage.getItem('authenticated')
        ? OpenWindow(redirectUrl, '_self')
        : undefined;
    },
    []
  );

  const validateAuthenticateUser = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      const login = await GetSignInLogin(username, password);
      const user = login.find(
        (user) => user.password === password && user.user === username
      );
      if (user) {
        const userData = await GetUser(user.id);
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('authenticated', 'true');

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
