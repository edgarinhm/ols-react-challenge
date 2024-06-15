import { GetEnvironmentFromLocationUrl } from 'common/functions/environment';
import styles from './top-bar.module.scss';
import logoImg from '/logo.png';
import { useAuthentication } from 'common/authentication/autentication';
import { PopoverActions } from 'common/models/popover-actions';
import {
  ActionsPopover,
  MenuButton,
} from 'common/components/popover/actions-popover';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import badgeStyles from 'common/sass/modules/badges.module.scss';
import Avatar from './avatar';

const TopBar = () => {
  const { Environment } =
    window['environment-config' as keyof typeof window] ?? {};
  const env: string = !Environment ? import.meta.env.MODE : Environment;
  const environment = GetEnvironmentFromLocationUrl();

  const popoverButtonRef = useRef<HTMLDivElement>(null);

  const notifications: string[] = [];
  const { handleLogout } = useAuthentication();

  const commonMenuOptions: PopoverActions[] = [
    { text: 'Log Out', action: () => handleLogout() },
  ];

  return (
    <div className={`${styles.topBar} ${styles[env.toLowerCase()]}`}>
      <div className={styles.userMenuEnvironment}>
        <span className={styles.brand}>
          <img src={logoImg} alt={'logo'} />
        </span>
        <button
          type="button"
          className={styles.sideBarMenuBtn}
          title="sidebar menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <span className={styles.environment}>
          {'Env:'} <strong>{environment.name}</strong>
        </span>
      </div>
      <div className={styles.userMenu}>
        <div className={styles.notification}>
          <FontAwesomeIcon icon={faBell} />
          {!!notifications?.length && (
            <span className={`${badgeStyles.warningRounded} ${styles.count}`}>
              {notifications}
            </span>
          )}
        </div>
        <Avatar url={''} />
        <div className={styles.menuBtn}>
          <ActionsPopover
            menuOptions={commonMenuOptions}
            placement={'bottom-end'}
          >
            <MenuButton ref={popoverButtonRef} />
          </ActionsPopover>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
