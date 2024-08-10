import { DivisionType, GetDivisonType, GetDivisonTypeId } from "common/enums/division-type";
import { GetUserRoleType, GetUserRoleTypeId, UserRoleType } from "common/enums/user-roles";
import {
  UserModel,
  CreateUserRequestModel,
  UpdateUserRequestModel,
} from "common/models/user/user-model";
import { UserFieldsModel } from "components/body/user/components/user-form/initial-data";

export const MapUser = (userFields: UserFieldsModel): UserModel => {
  return {
    id: Number(userFields.id) ?? 0,
    name: userFields.name,
    lastName: userFields.lastName,
    urlPhoto: userFields.urlPhoto,
    rol: userFields.rol ? GetUserRoleType(userFields.rol) : UserRoleType.ReadOnly,
    list: MapUserPipeList(userFields.list),
    area: GetDivisonTypeId(userFields.area as DivisionType),
  };
};

export const MapCreateUserRequest = (userFields: UserFieldsModel): CreateUserRequestModel => {
  return {
    name: MapUserCapitalizeNames(userFields.name),
    lastName: MapUserCapitalizeNames(userFields.lastName),
    urlPhoto: userFields.urlPhoto,
    rol: GetUserRoleTypeId(userFields.rol as UserRoleType),
    list: MapUserPipeList(userFields.list),
    area: GetDivisonTypeId(userFields.area as DivisionType),
  };
};

export const MapUserPipeList = (list: string): string => {
  return list
    .split("|")
    .map((technology) => technology.trim())
    .join("|");
};

export const MapUserCapitalizeNames = (names: string): string => {
  const namesList = names.trim().split(" ");
  return namesList.map((name) => `${name.charAt(0).toUpperCase()}${name.slice(1)}`).join(" ");
};

export const MapUserFieldsModel = (user: UserModel): UserFieldsModel => {
  console.log("user.list", user.list);

  return {
    id: `${user.id}`,
    name: user.name,
    lastName: user.lastName,
    urlPhoto: user.urlPhoto,
    list: user.list,
    rol: GetUserRoleType(`${user.rol}`),
    area: GetDivisonType(user.area),
  };
};

export const MapUpdateUserRequest = (userFields: UserFieldsModel): UpdateUserRequestModel => {
  return {
    ...MapCreateUserRequest(userFields),
    id: Number(userFields.id),
  };
};

export const MapUserListFieldModel = (list: string): string[] => {
  return list.split("|");
};
