export enum ProjectStatusType {
  InProgress = "In Progress",
  Completed = "Completed",
  Pending = "Pending",
  Fixed = "Fixed",
}

export enum ProjectStatusTypeId {
  InProgress = "En Desarrollo",
  Completed = "Terminado",
  Pending = "Pendiente",
  Fixed = "Corregido",
}

export const GetProjectStatusType = (statusName: string) => {
  switch (statusName) {
    case ProjectStatusTypeId.InProgress:
      return ProjectStatusType.InProgress;
    case ProjectStatusTypeId.Completed:
      return ProjectStatusType.Completed;
    case ProjectStatusTypeId.Pending:
      return ProjectStatusType.Pending;
    case ProjectStatusTypeId.Fixed:
      return ProjectStatusType.Fixed;
    default:
      return ProjectStatusType.Pending;
  }
};

export const GetProjectStatusId = (statusName: ProjectStatusType): ProjectStatusTypeId => {
  switch (statusName) {
    case ProjectStatusType.InProgress:
      return ProjectStatusTypeId.InProgress;
    case ProjectStatusType.Completed:
      return ProjectStatusTypeId.Completed;
    case ProjectStatusType.Pending:
      return ProjectStatusTypeId.Pending;
    case ProjectStatusType.Fixed:
      return ProjectStatusTypeId.Fixed;
    default:
      return ProjectStatusTypeId.Pending;
  }
};
