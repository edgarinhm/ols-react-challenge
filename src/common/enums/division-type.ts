export enum DivisionType {
  Support = "Support",
  Staff = "Staff",
  InternalApps = "InternalApps",
  NotAsigned = "NotAsigned",
}

export enum DivisionTypeId {
  Support = "Soporte",
  Staff = "Staff",
  InternalApps = "Fabrica",
  NotAsigned = "Sin Asignar",
}

export const GetDivisonType = (division: string): DivisionType => {
  switch (division) {
    case DivisionTypeId.Support:
      return DivisionType.Support;
    case DivisionTypeId.Staff:
      return DivisionType.Staff;
    case DivisionTypeId.InternalApps:
      return DivisionType.InternalApps;
    default:
      return DivisionType.NotAsigned;
  }
};

export const GetDivisonTypeId = (divisionType: DivisionType): DivisionTypeId => {
  switch (divisionType) {
    case DivisionType.Support:
      return DivisionTypeId.Support;
    case DivisionType.Staff:
      return DivisionTypeId.Staff;
    case DivisionType.InternalApps:
      return DivisionTypeId.InternalApps;
    default:
      return DivisionTypeId.NotAsigned;
  }
};
