import { TodoModel } from "common/models/todo-model";
import { NotificationModel } from "common/models/notification-model";
import { produce } from "immer";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

export type TopBarStorageModel = {
  notifications: NotificationModel[];
  todos: TodoModel[];
  isMainSideBarOpen: boolean;
  isTodoSideBarOpen: boolean;
  setState: (recipe: (state: TopBarStorageModel) => void) => void;
};

export const useTopBarStorage = createWithEqualityFn<TopBarStorageModel>()((set) => {
  return {
    notifications: [],
    todos: [],
    isMainSideBarOpen: true,
    isTodoSideBarOpen: false,
    setState: (recipe) => set(produce(recipe)),
  };
}, shallow);
