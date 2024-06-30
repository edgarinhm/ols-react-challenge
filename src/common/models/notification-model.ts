import { NotificationType } from "common/enums/notification-type";

export interface NotificationModel {
  id: number;
  type: NotificationType;
  details: string;
  time: string;
}
