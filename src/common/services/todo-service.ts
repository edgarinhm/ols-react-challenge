import { TodoModel } from "common/models/todo-model";
import { Todos } from "./api/api-routes";
import { axiosInstance } from "./api/api-base";

export const GetTodos = async (): Promise<TodoModel[]> => {
  const url = Todos.get();
  return (await axiosInstance.get<TodoModel[]>(url)).data;
};
