import { routes } from "routes";
import styles from "./main-side-bar.module.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faListCheck,
  faUsersGear,
  faIdCard,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useTopBarStorage } from "common/state-management/top-bar-storage";

const MainSideBar = () => {
  const hasAccessToProjectsPage = false;
  const hasAccessToUsersPage = false;
  const hasAccessToRolesPage = false;
  const [openMenuItem, setOpenMenuItem] = useState("");

  const isMainSideBarOpen = useTopBarStorage((state) => state.isMainSideBarOpen);

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
      items: [],
    },
    {
      text: "Usuarios",
      iconClass: faUsersGear,
      route: routes.users.name,
      isHidden: hasAccessToUsersPage,
      items: [],
    },
    {
      text: "Roles",
      iconClass: faIdCard,
      route: routes.roles.name,
      isHidden: hasAccessToRolesPage,
      items: [],
    },
  ];

  return (
    <div className={`${styles.mainSideBar} ${!isMainSideBarOpen ? styles.sideBarIconOnly : ""}`}>
      <nav>
        {menuItems
          .filter((item) => !item.isHidden)
          .map((menuItem) => {
            return (
              <NavLink
                tabIndex={0}
                key={menuItem.text}
                className={({ isActive }) => (isActive ? styles.active : styles.navItem)}
                to={menuItem.route}
                onClick={() =>
                  setOpenMenuItem(openMenuItem !== menuItem.route ? menuItem.route : "")
                }
              >
                <FontAwesomeIcon icon={menuItem.iconClass} className={styles.menuIcon} />
                <span>{menuItem.text}</span>
                {menuItem.items && (
                  <FontAwesomeIcon
                    className={`${styles.menuArrow} ${openMenuItem === menuItem.route ? styles.menuItemExpanded : ""}`}
                    icon={faAngleRight}
                  />
                )}
              </NavLink>
            );
          })}
      </nav>
    </div>
  );
};

export default MainSideBar;
