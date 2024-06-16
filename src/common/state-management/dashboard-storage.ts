import { DashboardCardModel } from "common/models/dashboard-card-model";
import { DashboardServerReportModel } from "common/models/dashboard-cpu-report-model";
import { NotificationModel } from "common/models/notification-model";
import { produce } from "immer";
import { create } from "zustand";

export type DashboardStorageModel = {
  notifications: NotificationModel[];
  cards: DashboardCardModel | undefined;
  serverReport: DashboardServerReportModel | undefined;
  setState: (recipe: (state: DashboardStorageModel) => void) => void;
};

export const useDashboardStorage = create<DashboardStorageModel>()((set) => {
  return {
    notifications: [],
    cards: undefined,
    serverReport: undefined,
    setState: (recipe) => set(produce(recipe)),
  };
});
