import { ProjectStatus } from "common/enums/project-status-type";

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
