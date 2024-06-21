import { LocalStorageKeys } from "common/enums/local-storage-keys";
import { UserModel } from "./user/user-model";

export type LocalStorageModel = {
  [LocalStorageKeys.noExpireSession]?: boolean;
  [LocalStorageKeys.isMainSidebarCollapsed]?: boolean;
  [LocalStorageKeys.user]?: UserModel;
  [LocalStorageKeys.tokenStartTime]?: number;
};
