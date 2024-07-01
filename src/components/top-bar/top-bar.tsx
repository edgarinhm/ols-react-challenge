import styles from "./top-bar.module.scss";
import { useAuthentication } from "common/authentication/authentication";
import { PopoverActionsIcon } from "common/models/popover-actions";
import { MenuButton } from "common/components/popover/actions-popover";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./avatar";
import { ActionsIconPopover } from "common/components/popover/actions-icon-popover";
import { GetTodos } from "common/services/todo-service";
import Notifications from "./notifications";
import { useTopBarStorage } from "common/state-management/top-bar-storage";
import Brand from "./brand";
import { GetNotifications } from "common/services/notification-service";

const TopBar = () => {
  const { Environment } = window["environment-config" as keyof typeof window] ?? {};
  const env: string = !Environment ? import.meta.env?.VITE_APP_ENVIRONMENT : Environment;

  const { handleLogout } = useAuthentication();

  const commonMenuOptions: PopoverActionsIcon[] = [
    {
      idKey: "Logout",
      text: "Logout",
      icon: <FontAwesomeIcon icon={faPowerOff} />,
      action: () => handleLogout(),
    },
  ];

  const setTopBarState = useTopBarStorage((state) => state.setState);

  const handleTodoSideBar = (): void => {
    setTopBarState((state) => {
      state.isTodoSideBarOpen = !state.isTodoSideBarOpen;
    });
  };

  useEffect(() => {
    const loadTodosData = async () => {
      try {
        const todosData = await GetTodos();
        setTopBarState((state) => {
          state.todos = todosData;
        });
      } catch (error) {
        console.log(error);
      }
    };
    loadTodosData();
  }, []);

  useEffect(() => {
    const loadNotificationsData = async () => {
      try {
        const notificacions = await GetNotifications();
        setTopBarState((state) => {
          state.notifications = notificacions;
        });
      } catch (error) {
        console.log(error);
      }
    };
    loadNotificationsData();
  }, []);

  return (
    <div className={`${styles.topBar} ${styles[env.toLowerCase()]} `}>
      <Brand />
      <div className={styles.userMenu}>
        <Notifications />
        <div className={styles.avatar}>
          <ActionsIconPopover menuOptions={commonMenuOptions} placement={"bottom-end"}>
            <Avatar url={"/vite.svg"} />
          </ActionsIconPopover>
        </div>
        <div className={styles.menuBtn}>
          <button onClick={handleTodoSideBar}>
            <MenuButton />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
