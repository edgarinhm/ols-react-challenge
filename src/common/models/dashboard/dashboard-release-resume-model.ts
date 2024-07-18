export interface NCStateModel {
  detected: number;
  process: number;
  solved: number;
}

export interface ProjectModel {
  name: string;
  porcentaje: string;
  isNc: boolean;
  isDelay: boolean;
  isDeliver: boolean;
}

export interface DashboardReleaseResumeModel {
  porcentaje: string;
  cicle: string;
  topProjects: ProjectModel[];
  ncState: NCStateModel;
}
