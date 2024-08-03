import { BackendTechnologyType } from "common/enums/backend-technology-type";
import { DatabaseTechnologyType } from "common/enums/database-technology-type";
import { FrontendTechnologyType } from "common/enums/frontend-technology-type";
import { ProjectStatusType } from "common/enums/project-status-type";

export interface ProjectModel {
  id: number;
  projectName: string;
  repoUrl: string;
  client: string;
  developers: string;
  ci: boolean;
  cd: boolean;
  frontendTecnology: FrontendTechnologyType;
  backendTecnology: BackendTechnologyType;
  databases: DatabaseTechnologyType;
  errorsCount: number;
  warningCount: number;
  deployCount: number;
  percentageCompletion: number;
  reportNc: number;
  status: ProjectStatusType;
}
