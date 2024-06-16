import { UserModel } from "common/models/user/user-model";
import { axiosInstance } from "./api/api-base";
import { Login, Users } from "./api/api-routes";
import { loginModel } from "common/models/user/login-model";

export const GetSignInLogin = async (user: string, password: string): Promise<loginModel[]> => {
  const url = Login.get();
  return (await axiosInstance.get<loginModel[]>(url, { params: { user, password } })).data;
};

export const GetUser = async (userId: number): Promise<UserModel[]> => {
  const url = Users.get();
  return (await axiosInstance.get<UserModel[]>(url, { params: { id: userId } })).data;
};
