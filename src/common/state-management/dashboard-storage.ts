import { DashboardCardModel } from "common/models/dashboard/dashboard-card-model";
import { DashboardReportCommit } from "common/models/dashboard/dashboard-report-commit-model";
import { DashboardServerReportModel } from "common/models/dashboard/dashboard-server-report-model";
import { TodoModel } from "common/models/todo-model";
import { produce } from "immer";
import { create } from "zustand";

export type DashboardStorageModel = {
  cards: DashboardCardModel | undefined;
  serverReport: DashboardServerReportModel | undefined;
  todos: TodoModel[];
  commitsReport: DashboardReportCommit[];
  setState: (recipe: (state: DashboardStorageModel) => void) => void;
};

export const useDashboardStorage = create<DashboardStorageModel>()((set) => {
  return {
    cards: undefined,
    serverReport: undefined,
    todos: [],
    commitsReport: [],
    setState: (recipe) => set(produce(recipe)),
  };
});
