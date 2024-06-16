import { routes } from "routes";
import styles from "./main-side-bar.module.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faListCheck, faUsersGear, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { useSharedStorage } from "common/state-management/shared-storage";

const MainSideBar = () => {
  const hasAccessToProjectsPage = false;
  const hasAccessToUsersPage = false;
  const hasAccessToRolesPage = false;

  const isCollapsed = useSharedStorage((state) => state.isMainSidebarCollapsed);

  const menuItems = [
    {
      text: "Dashboard",
      iconClass: faDashboard,
      route: routes.dashboard.name,
    },
    {
      text: "Proyectos",
      iconClass: faListCheck,
      route: routes.projects.name,
      isHidden: hasAccessToProjectsPage,
    },
    {
      text: "Usuarios",
      iconClass: faUsersGear,
      route: routes.users.name,
      isHidden: hasAccessToUsersPage,
    },
    {
      text: "Roles",
      iconClass: faIdCard,
      route: routes.roles.name,
      isHidden: hasAccessToRolesPage,
    },
  ];

  return (
    <div className={styles.mainSideBar}>
      <nav className={isCollapsed ? styles.collapsed : ""}>
        {menuItems
          .filter((item) => !item.isHidden)
          .map((menuItem) => {
            return (
              <NavLink
                tabIndex={0}
                key={menuItem.text}
                className={({ isActive }) => (isActive ? styles.active : styles.navItem)}
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
