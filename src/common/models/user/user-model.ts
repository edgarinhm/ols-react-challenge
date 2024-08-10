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

export interface CreateUserRequestModel {
  name: string;
  lastName: string;
  urlPhoto: string;
  rol: number;
  list: string;
  area: string;
}

export interface UpdateUserRequestModel extends CreateUserRequestModel {
  id: number;
}
