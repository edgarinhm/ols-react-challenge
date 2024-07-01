import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionsIconPopover } from "common/components/popover/actions-icon-popover";
import styles from "./top-bar.module.scss";
import badgeStyles from "common/sass/modules/badges.module.scss";
import {
  GetFormattedNotificationTimeFromNow,
  GetNotificationIconClass,
} from "common/functions/notification-functions";
import { useTopBarStorage } from "common/state-management/top-bar-storage";
import { PopoverActionsIcon } from "common/models/popover-actions";

const Notifications = (): JSX.Element => {
  const notifications = useTopBarStorage((state) => state.notifications);
  const notificationsMenuOptions: PopoverActionsIcon[] = notifications.map(
    (notification, index) => {
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
    }
  );

  return (
    <div className={styles.notification}>
      <ActionsIconPopover
        title={"Notificaciones"}
        menuOptions={notificationsMenuOptions}
        placement={"bottom-end"}
        overflow="auto"
      >
        <FontAwesomeIcon icon={faBell} />
        {!!notifications?.length && (
          <span className={`${badgeStyles.warningRounded} ${styles.count}`}>
            {notifications.length}
          </span>
        )}
      </ActionsIconPopover>
    </div>
  );
};

export default Notifications;
