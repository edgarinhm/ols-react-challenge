import { NotificationModel } from "common/models/notification-model";
import { Notification } from "./api/api-routes";
import { axiosInstance } from "./api/api-base";

export const GetNotifications = async (): Promise<NotificationModel[]> => {
  const url = Notification.get();
  return (await axiosInstance.get<NotificationModel[]>(url)).data;
};
