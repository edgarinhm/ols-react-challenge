import {
  UserModel,
  CreateUserRequestModel,
  UpdateUserRequestModel,
} from "common/models/user/user-model";
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

export const CreateUser = async (user: CreateUserRequestModel): Promise<UserModel> => {
  const url = Users.post();
  return (await axiosInstance.post<UserModel>(url, user)).data;
};

export const GetUserById = async (userId: number): Promise<UserModel> => {
  const url = Users.get();
  return (await axiosInstance.get<UserModel[]>(url, { params: { id: userId } })).data[0];
};

export const UpdateUser = async (user: UpdateUserRequestModel): Promise<UserModel> => {
  const url = Users.put(user.id);
  return (await axiosInstance.put<UserModel>(url, user)).data;
};
