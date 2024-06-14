import { UserModel } from 'common/models/user/user-model';
import { axiosInstance } from './api/api-base';
import { User } from './api/api-routes';

export const GetUser = async (
  username: string,
  password: string
): Promise<UserModel> => {
  const url = User.get();
  return (
    await axiosInstance.get<UserModel>(url, { params: { username, password } })
  ).data;
};
