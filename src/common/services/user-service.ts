import { UserModel } from "common/models/user/user-model";
import { axiosInstance } from "./api/api-base";
import { Users } from "./api/api-routes";

export const GetUser = async (userId: number): Promise<UserModel[]> => {
  const url = Users.get();
  return (await axiosInstance.get<UserModel[]>(url, { params: { id: userId } })).data;
};

export const GetAllUsers = async (): Promise<UserModel[]> => {
  const url = Users.get();
  return (await axiosInstance.get<UserModel[]>(url)).data;
};

export const RemoveUser = async (userId: number): Promise<UserModel> => {
  const url = Users.delete(userId);
  return (await axiosInstance.delete<UserModel>(url)).data;
};
