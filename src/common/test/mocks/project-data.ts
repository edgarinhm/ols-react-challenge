import { ProjectStatusType } from "common/enums/project-status-type";
import { ProjectModel } from "common/models/project-model";

export const ProjectsData: ProjectModel[] = [
  {
    id: 99,
    projectName: "Maecenas Mi LLP",
    repoUrl: "https://",
    client: "Enim Nunc Ut Incorporated",
    developers: "Joan Alexis Cordoba Narvaez",
    ci: false,
    cd: true,
    frontendTecnology: "VueJS|Angular|ReactNative",
    backendTecnology: "NodeJS",
    databases: "Oracle,PosgresSQL",
    errorsCount: 24,
    warningCount: 9,
    deployCount: 8,
    percentageCompletion: 62,
    reportNc: 125,
    status: ProjectStatusType.InProgress,
  },
];
