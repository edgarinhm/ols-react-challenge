export enum ProjectStatusType {
  InProgress = "In Progress",
  Completed = "Completed",
  Pending = "Pending",
  Fixed = "Fixed",
}

export const GetProyectStatusType = (statusName: string) => {
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
