export enum UserRoleType {
  Administrator = "Administrator",
  Developer = "Developer",
  ReadOnly = "ReadOnly",
}

export const GetUserRoleType = (role: string): UserRoleType => {
  console.log("role", role);

  switch (role) {
    case "1":
      return UserRoleType.Administrator;
    case "2":
      return UserRoleType.Developer;
    default:
      return UserRoleType.ReadOnly;
  }
};

export const GetUserRoleTypeId = (role: UserRoleType): number => {
  switch (role) {
    case UserRoleType.Administrator:
      return 1;
    case UserRoleType.Developer:
      return 2;
    default:
      return 0;
  }
};
