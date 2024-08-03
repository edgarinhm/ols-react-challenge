import { axiosInstance } from "./api/api-base";
import { Login } from "./api/api-routes";
import { LoginModel } from "common/models/user/login-model";

export const GetSignInLogin = async (user: string, password: string): Promise<LoginModel[]> => {
  const url = Login.get();
  return (await axiosInstance.get<LoginModel[]>(url, { params: { user, password } })).data;
};

export const CreateSignUpLogin = async (user: string, password: string): Promise<LoginModel> => {
  const url = Login.post();
  return (await axiosInstance.post<LoginModel>(url, { user, password })).data;
};
