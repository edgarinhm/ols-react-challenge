export enum ProjectStatusType {
  InProgress = "In Progress",
  Completed = "Completed",
  Pending = "Pending",
  Fixed = "Fixed",
}

export const GetProjectStatusType = (statusName: string) => {
  switch (statusName.toLocaleLowerCase()) {
    case "en desarrollo":
      return ProjectStatusType.InProgress;
    case "terminado":
      return ProjectStatusType.Completed;
    case "pendiente":
      return ProjectStatusType.Pending;
    case "corregido":
      return ProjectStatusType.Fixed;
    default:
      return ProjectStatusType.Pending;
  }
};

export const GetProjectStatusId = (statusName: ProjectStatusType) => {
  switch (statusName.toLocaleLowerCase()) {
    case ProjectStatusType.InProgress:
      return "en desarrollo";
    case ProjectStatusType.Completed:
      return "terminado";
    case ProjectStatusType.Pending:
      return "pendiente";
    case ProjectStatusType.Fixed:
      return "corregido";
    default:
      return "pendiente";
  }
};
