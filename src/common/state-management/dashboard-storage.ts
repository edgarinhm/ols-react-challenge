import { DashboardCardModel } from "common/models/dashboard-card-model";
import { NotificationModel } from "common/models/notification-model";
import { produce } from "immer";
import { create } from "zustand";

export type DashboardStorageModel = {
  notifications: NotificationModel[];
  dashboardCard: DashboardCardModel | undefined;
  setState: (recipe: (state: DashboardStorageModel) => void) => void;
};

export const useDashboardStorage = create<DashboardStorageModel>()((set) => {
  return {
    notifications: [],
    dashboardCard: undefined,
    setState: (recipe) => set(produce(recipe)),
  };
});
