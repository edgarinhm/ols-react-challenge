import { NotificationType } from "common/enums/notification-type";

import {
  faInfoCircle,
  faGear,
  faCircleUser,
  faWarning,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export const GetNotificationIconClass = (notificationType: NotificationType): IconDefinition => {
  switch (notificationType) {
    case NotificationType.Info:
      return faInfoCircle;
    case NotificationType.Warning:
      return faCircleUser;
    case NotificationType.Error:
      return faGear;
    default:
      return faWarning;
  }
};
