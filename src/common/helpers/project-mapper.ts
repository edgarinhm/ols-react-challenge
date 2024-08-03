import {
  GetProjectStatusId,
  GetProjectStatusType,
  ProjectStatusType,
} from "common/enums/project-status-type";
import { ProjectModel } from "common/models/project-model";
import { ProjectFieldsModel } from "components/body/project/components/project-form/initial-data";

export const MapProject = (projectFormFields: ProjectFieldsModel): ProjectModel => {
  return {
    projectName: projectFormFields.projectName,
    client: projectFormFields.client,
    repoUrl: projectFormFields.repoUrl,
    developers: projectFormFields.developers.replaceAll(",", "|"),
    ci: projectFormFields.ci === "true",
    cd: projectFormFields.cd === "true",
    frontendTecnology: projectFormFields.frontend.replaceAll(",", "|"),
    backendTecnology: projectFormFields.backend,
    databases: projectFormFields.database.replaceAll(",", "|"),
    deployCount: projectFormFields.deployCount ? Number(projectFormFields.deployCount) : 0,
    errorsCount: projectFormFields.errorsCount ? Number(projectFormFields.errorsCount) : 0,
    id: projectFormFields.id ? Number(projectFormFields.id) : 0,
    percentageCompletion: projectFormFields.percentageCompletion
      ? Number(projectFormFields.percentageCompletion)
      : 0,
    reportNc: projectFormFields.reportNc ? Number(projectFormFields.reportNc) : 0,
    status: projectFormFields.status
      ? GetProjectStatusType(projectFormFields.status)
      : ProjectStatusType.Pending,
    warningCount: projectFormFields.warningCount ? Number(projectFormFields.warningCount) : 0,
  };
};

export const MapProjectFields = (project: ProjectModel): ProjectFieldsModel => {
  return {
    id: `${project.id}`,
    projectName: project.projectName,
    client: project.client,
    repoUrl: project.repoUrl,
    developers: project.developers,
    ci: `${project.ci}`,
    cd: `${project.cd}`,
    frontend: project.frontendTecnology,
    backend: project.backendTecnology,
    database: project.databases,
    deployCount: `${project.deployCount}`,
    errorsCount: `${project.deployCount}`,
    percentageCompletion: `${project.percentageCompletion}`,
    reportNc: `${project.reportNc}`,
    status: GetProjectStatusId(project.status),
    warningCount: `${project.warningCount}`,
  };
};
