import { ProjectStatusTypeId } from "common/enums/project-status-type";

export interface ProjectModel {
  id: number;
  projectName: string;
  repoUrl: string;
  client: string;
  developers: string;
  ci: boolean;
  cd: boolean;
  frontendTecnology: string;
  backendTecnology: string;
  databases: string;
  errorsCount: number;
  warningCount: number;
  deployCount: number;
  percentageCompletion: number;
  reportNc: number;
  status: ProjectStatusTypeId;
}
