import { NotificationModel } from "common/models/notification-model";
import { produce } from "immer";
import { create } from "zustand";

export type DashboardStorageModel = {
  notifications: NotificationModel[];
  setState: (recipe: (state: DashboardStorageModel) => void) => void;
};

export const useDashboardStorage = create<DashboardStorageModel>()((set) => {
  return {
    notifications: [],
    setState: (recipe) => set(produce(recipe)),
  };
});
