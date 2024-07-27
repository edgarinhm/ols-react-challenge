import { Projects } from "./api/api-routes";
import { axiosInstance } from "./api/api-base";
import { ProjectModel } from "common/models/project-model";

export const GetProjects = async (): Promise<ProjectModel[]> => {
  const url = Projects.get();
  return (await axiosInstance.get<ProjectModel[]>(url)).data;
};
