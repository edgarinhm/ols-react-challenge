import { GetEnvironmentFromLocationUrl } from "common/functions/environment";
import styles from "./top-bar.module.scss";
import logoImg from "/logo.png";
import { useAuthentication } from "common/authentication/authentication";
import { PopoverActionsIcon } from "common/models/popover-actions";
import { MenuButton } from "common/components/popover/actions-popover";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import badgeStyles from "common/sass/modules/badges.module.scss";
import Avatar from "./avatar";
import { useSharedStorage } from "common/state-management/shared-storage";
import { LocalStorageKeys } from "common/enums/local-storage-keys";
import { shallow } from "zustand/shallow";
import { useDashboardStorage } from "common/state-management/dashboard-storage";
import { ActionsIconPopover } from "common/components/popover/actions-icon-popover";
import {
  GetFormattedNotificationTimeFromNow,
  GetNotificationIconClass,
} from "common/functions/notification-functions";

const TopBar = () => {
  const { Environment } = window["environment-config" as keyof typeof window] ?? {};
  const env: string = !Environment ? import.meta.env?.VITE_APP_ENVIRONMENT : Environment;
  const { name: environmentName } = GetEnvironmentFromLocationUrl();

  const notifications = useDashboardStorage((state) => state.notifications);

  const { handleLogout } = useAuthentication();

  const commonMenuOptions: PopoverActionsIcon[] = [
    {
      idKey: "Logout",
      text: "Logout",
      icon: <FontAwesomeIcon icon={faPowerOff} />,
      action: () => handleLogout(),
    },
  ];

  const notificationsMenuOptions = notifications.map((notification, index) => {
    const notificationIcon = GetNotificationIconClass(notification.type);
    return {
      idKey: `${notification.id}-${index}`,
      icon: (
        <div className={`${styles.notificationMenuIcon} ${styles[notification.type]}`}>
          <FontAwesomeIcon icon={notificationIcon} />
        </div>
      ),
      children: (
        <div className={styles.notificationMenuOption}>
          {notification.details}
          <span>{GetFormattedNotificationTimeFromNow(notification.time)}</span>
        </div>
      ),
      action: () => "",
    };
  });

  const { isCollapsed, initializeItem, updateStorage } = useSharedStorage(
    (state) => ({
      isCollapsed: state.isMainSidebarCollapsed,
      initializeItem: state.initializeItem,
      updateStorage: state.updateStorage,
    }),
    shallow
  );

  const handleCollapsed = (): void => {
    updateStorage(LocalStorageKeys.isMainSidebarCollapsed, !isCollapsed);
  };

  useEffect(() => {
    initializeItem(LocalStorageKeys.isMainSidebarCollapsed, false);
  }, []);

  return (
    <div
      className={`${styles.topBar} ${styles[env.toLowerCase()]} ${isCollapsed ? styles.sideBarCollapsed : ""}`}
    >
      <div className={`${styles.brand}`}>
        <a href="#">
          <img src={logoImg} alt={"logo"} />
        </a>
      </div>
      <div className={styles.userMenuEnvironment}>
        <button
          type="button"
          className={styles.sideBarMenuBtn}
          title={"sidebar menu"}
          onClick={handleCollapsed}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <span className={styles.environment}>
          {"OLS:"} <strong>{environmentName}</strong>
        </span>
      </div>
      <div className={styles.userMenu}>
        <div className={styles.notification}>
          <ActionsIconPopover menuOptions={notificationsMenuOptions} placement={"bottom-end"}>
            <FontAwesomeIcon icon={faBell} />
            {!!notifications?.length && (
              <span className={`${badgeStyles.warningRounded} ${styles.count}`}>
                {notifications.length}
              </span>
            )}
          </ActionsIconPopover>
        </div>
        <div className={styles.avatar}>
          <ActionsIconPopover menuOptions={commonMenuOptions} placement={"bottom-end"}>
            <Avatar url={"/vite.svg"} />
          </ActionsIconPopover>
        </div>
        <div className={styles.menuBtn}>
          <MenuButton />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
