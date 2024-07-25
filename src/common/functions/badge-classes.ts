import { ProjectStatusType } from "common/enums/project-status-type";
import badgeStyles from "common/sass/modules/badges.module.scss";

export const GetProjecStatusBadgeClass = (status: ProjectStatusType): string => {
  switch (status) {
    case ProjectStatusType.Completed:
      return badgeStyles.activeRounded;
    case ProjectStatusType.InProgress:
      return badgeStyles.inProgressRounded;
    case ProjectStatusType.Pending:
      return badgeStyles.warningRounded;
    case ProjectStatusType.Fixed:
      return badgeStyles.upcomingRounded;
    default:
      return badgeStyles.inactiveRounded;
  }
};
