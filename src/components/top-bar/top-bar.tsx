import { GetEnvironmentFromLocationUrl } from "common/functions/environment";
import styles from "./top-bar.module.scss";
import logoImg from "/logo.png";
import { useAuthentication } from "common/authentication/authentication";
import { PopoverActions } from "common/models/popover-actions";
import { ActionsPopover, MenuButton } from "common/components/popover/actions-popover";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import badgeStyles from "common/sass/modules/badges.module.scss";
import Avatar from "./avatar";
import { useSharedStorage } from "common/state-management/shared-storage";
import { LocalStorageKeys } from "common/enums/local-storage-keys";
import { shallow } from "zustand/shallow";
import { useDashboardStorage } from "common/state-management/dashboard-storage";

const TopBar = () => {
  const { Environment } = window["environment-config" as keyof typeof window] ?? {};
  const env: string = !Environment ? import.meta.env.MODE : Environment;
  const environment = GetEnvironmentFromLocationUrl();

  const popoverButtonRef = useRef<HTMLDivElement>(null);

  const notifications = useDashboardStorage((state) => state.notifications);
  const { handleLogout } = useAuthentication();

  const commonMenuOptions: PopoverActions[] = [{ text: "Log Out", action: () => handleLogout() }];

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
    <div className={`${styles.topBar} ${styles[env.toLowerCase()]}`}>
      <div className={styles.brand}>
        <a href="#">
          <img src={logoImg} alt={"logo"} />
        </a>
      </div>
      <div className={styles.userMenuEnvironment}>
        <button
          type="button"
          className={styles.sideBarMenuBtn}
          title="sidebar menu"
          onClick={handleCollapsed}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <span className={styles.environment}>
          {"Env:"} <strong>{environment.name}</strong>
        </span>
      </div>
      <div className={styles.userMenu}>
        <div className={styles.notification}>
          <FontAwesomeIcon icon={faBell} />
          {!!notifications?.length && (
            <span className={`${badgeStyles.warningRounded} ${styles.count}`}>
              {notifications.length}
            </span>
          )}
        </div>
        <Avatar url={""} />
        <div className={styles.menuBtn}>
          <ActionsPopover menuOptions={commonMenuOptions} placement={"bottom-end"}>
            <MenuButton ref={popoverButtonRef} />
          </ActionsPopover>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
