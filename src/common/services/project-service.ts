import { ProjectById, Projects } from "./api/api-routes";
import { axiosInstance } from "./api/api-base";
import { ProjectModel } from "common/models/project-model";

export const GetProjects = async (): Promise<ProjectModel[]> => {
  const url = Projects.get();
  return (await axiosInstance.get<ProjectModel[]>(url)).data;
};

export const CreateProject = async (project: ProjectModel): Promise<ProjectModel> => {
  const url = Projects.post();
  return (await axiosInstance.post<ProjectModel>(url, project)).data;
};

export const RemoveProject = async (projectId: number): Promise<ProjectModel> => {
  const url = Projects.delete(projectId);
  return (await axiosInstance.delete<ProjectModel>(url)).data;
};

export const UpdateProject = async (project: ProjectModel): Promise<ProjectModel> => {
  const url = Projects.put(project.id);
  return (await axiosInstance.put<ProjectModel>(url, project)).data;
};

export const GetProjectById = async (projectId: number): Promise<ProjectModel> => {
  const url = ProjectById.get(projectId);
  return (await axiosInstance.get<ProjectModel>(url)).data;
};
