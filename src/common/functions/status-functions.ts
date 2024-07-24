import { ProjectStatus } from "common/enums/project-status-type";
import { ProjectModel } from "common/models/project-model";

export const StatusSortOrder = (status: ProjectStatus): number => {
  switch (status) {
    case ProjectStatus.Complete:
      return 1;

    case ProjectStatus.InProgress:
      return 2;

    case ProjectStatus.NotStarted:
      return 3;

    default:
      return 7;
  }
};

export const GetProjectCiCdStatusClass = (status: boolean): string => {
  return status ? "green" : "red";
};

export const GetProjectAlertStatusClass = (status: keyof ProjectModel): string => {
  switch (status) {
    case "deployCount":
      return "blue";
    case "errorsCount":
    case "reportNc":
      return "red";
    case "warningCount":
      return "yellow";
    case "percentageCompletion":
      return "green";
    default:
      return "grey";
  }
};
