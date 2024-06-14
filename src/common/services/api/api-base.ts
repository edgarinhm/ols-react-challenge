import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.VITE_API_HOSTNAME,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AxiosSWRFetcher = async <T>(url: string): Promise<T> => {
  return axiosInstance.get(url).then((res) => res.data);
};

export const AxiosMultipleKeySWRFetcher = async <T>([
  url,
]: string[]): Promise<T> => {
  return axiosInstance.get(url).then((res) => res.data);
};

export const ApiBase = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axiosInstance.interceptors.request.use(async (config: any) => {
    //const bearer = `Bearer ${response.accessToken}`;
    //config.headers.Authorization = bearer;

    return config;
  });

  return children;
};
