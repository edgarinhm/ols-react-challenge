import { OpenWindow } from 'common/functions/windows-funtions';
import { GetSignInLogin, GetUser } from 'common/services/login-service';

export const ValidateAuthenticateUser = async (
  username: string,
  password: string
): Promise<boolean> => {
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
};

export const HandleLoginRedirect = (redirectUrl: string): void => {
  OpenWindow(redirectUrl, '_self');
};

export const HandleAuthenticatedRedirect = (redirectUrl: string) => {
  return !!sessionStorage.getItem('authenticated')
    ? OpenWindow(redirectUrl, '_self')
    : undefined;
};
