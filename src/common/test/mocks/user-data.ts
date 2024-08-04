import { UserRoleType } from "common/enums/user-roles";
import { UserModel } from "common/models/user/user-model";

export const UserData: UserModel = {
  id: 102,
  name: "test-name",
  lastName: "test-lastname",
  urlPhoto: "test-url-photo",
  rol: UserRoleType.Administrator,
  list: "VueJS|Angular|React",
  area: "test-soporte",
};
