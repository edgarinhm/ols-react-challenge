import { DivisionType, GetDivisonTypeId } from "common/enums/division-type";
import { GetUserRoleType, UserRoleType } from "common/enums/user-roles";
import { UserModel } from "common/models/user/user-model";
import { UserFieldsModel } from "components/body/user/components/user-form/initial-data";

export const MapUser = (userFields: UserFieldsModel): UserModel => {
  return {
    id: Number(userFields.id) ?? 0,
    name: userFields.name,
    lastName: userFields.lastName,
    urlPhoto: userFields.urlPhoto,
    rol: userFields.rol ? GetUserRoleType(userFields.rol) : UserRoleType.ReadOnly,
    list: userFields.list
      .split("|")
      .map((technology) => technology.trim())
      .join("|"),
    area: GetDivisonTypeId(userFields.area as DivisionType),
  };
};
