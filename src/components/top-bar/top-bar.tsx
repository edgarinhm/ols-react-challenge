import { GetEnvironmentFromLocationUrl } from 'common/functions/environment';
import styles from './top-bar.module.scss';
import logoImg from '/logo.png';
import { useAuthentication } from 'common/authentication/autentication';
import { PopoverActions } from 'common/models/popover-actions';
import {
  ActionsPopover,
  GearButton,
} from 'common/components/popover/actions-popover';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const TopBar = () => {
  const { Environment } =
    window['environment-config' as keyof typeof window] ?? {};
  const env: string = !Environment ? import.meta.env.MODE : Environment;
  const environment = GetEnvironmentFromLocationUrl();
  const username = 'Edgar';

  const popoverButtonRef = useRef<HTMLDivElement>(null);

  const { handleLogout } = useAuthentication();

  const commonMenuOptions: PopoverActions[] = [
    { text: 'Log Out', action: () => handleLogout() },
  ];

  return (
    <div className={`${styles.layout} ${styles[env.toLowerCase()]}`}>
      <div className={styles.userMenuEnvironment}>
        <span className={styles.brand}>
          <img src={logoImg} alt={'logo'} />
        </span>
        <button className={styles.menuBtn}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <span className={styles.environment}>
          {'Env:'} <strong>{environment.name}</strong>
        </span>
      </div>
      <div className={styles.userMenu}>
        <span>
          {'Logged in as '}
          <strong>{username}</strong>
        </span>
        <div className={styles.gear}>
          <ActionsPopover
            menuOptions={commonMenuOptions}
            placement={'bottom-end'}
          >
            <GearButton ref={popoverButtonRef} />
          </ActionsPopover>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
