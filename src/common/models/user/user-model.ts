import { UserRoleType } from "common/enums/user-roles";

export interface UserModel {
  id: number;
  name: string;
  lastName: string;
  urlPhoto: string;
  rol: UserRoleType;
  list: string;
  area: string;
}
