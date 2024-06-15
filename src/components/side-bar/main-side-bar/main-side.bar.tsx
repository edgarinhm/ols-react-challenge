import { routes } from 'routes';
import styles from './main-side-bar.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard,
  faListCheck,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const MainSideBar = () => {
  const hasAccessToProjectsPage = false;
  const hasAccessToUsersPage = false;
  const isCollapsed = false;
  const menuItems = [
    {
      text: 'Dashboard',
      iconClass: faDashboard,
      route: routes.dashboard.name,
    },
    {
      text: 'Proyectos',
      iconClass: faListCheck,
      route: routes.projects.name,
      isHidden: hasAccessToProjectsPage,
    },
    {
      text: 'Usuarios',
      iconClass: faUser,
      route: routes.users.name,
      isHidden: hasAccessToUsersPage,
    },
  ];
  return (
    <div className={styles.mainSideBar}>
      <nav className={isCollapsed ? styles.collapsed : ''}>
        {menuItems
          .filter((item) => !item.isHidden)
          .map((menuItem) => {
            return (
              <NavLink
                tabIndex={0}
                key={menuItem.text}
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navItem
                }
                to={menuItem.route}
              >
                <FontAwesomeIcon icon={menuItem.iconClass} />
                <span>{menuItem.text}</span>
              </NavLink>
            );
          })}
      </nav>
    </div>
  );
};

export default MainSideBar;
