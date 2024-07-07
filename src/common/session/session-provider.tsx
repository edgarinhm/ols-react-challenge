import { useAuthentication } from "common/authentication/authentication";
import { SESSION_LENGTH } from "common/constants/session";
import { LocalStorageKeys } from "common/enums/local-storage-keys";
import { useSharedStorage } from "common/state-management/shared-storage";
import { ReactNode, useEffect } from "react";

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const tokenStartTime = useSharedStorage((state) => state[LocalStorageKeys.tokenStartTime]);
  const noExpireSession = useSharedStorage((state) => state[LocalStorageKeys.noExpireSession]);
  const { handleLogout } = useAuthentication();

  useEffect(() => {
    if (tokenStartTime) {
      const actualSecondsRemaining = (SESSION_LENGTH - (Date.now() - tokenStartTime)) / 1000;
      if (actualSecondsRemaining <= 0 && !noExpireSession) {
        handleLogout();
      }
    }
  }, [handleLogout, noExpireSession, tokenStartTime]);

  return <>{children}</>;
};

export default SessionProvider;
