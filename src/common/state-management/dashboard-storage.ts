import { DashboardCardModel } from "common/models/dashboard/dashboard-card-model";
import { DashboardServerReportModel } from "common/models/dashboard/dashboard-server-report-model";
import { TodoModel } from "common/models/todo-model";
import { produce } from "immer";
import { create } from "zustand";

export type DashboardStorageModel = {
  cards: DashboardCardModel | undefined;
  serverReport: DashboardServerReportModel | undefined;
  todos: TodoModel[];
  setState: (recipe: (state: DashboardStorageModel) => void) => void;
};

export const useDashboardStorage = create<DashboardStorageModel>()((set) => {
  return {
    cards: undefined,
    serverReport: undefined,
    todos: [],
    setState: (recipe) => set(produce(recipe)),
  };
});
