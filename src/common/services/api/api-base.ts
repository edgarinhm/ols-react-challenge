import axios from "axios";
import { useApiResponseMiddleware } from "common/hooks/use-api-response-middleware";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOSTNAME,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosSWRFetcher = async <T>(url: string): Promise<T> => {
  return axiosInstance.get(url).then((res) => res.data);
};

export const AxiosMultipleKeySWRFetcher = async <T>([url]: string[]): Promise<T> => {
  return axiosInstance.get(url).then((res) => res.data);
};

export const ApiBaseProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axiosInstance.interceptors.request.use(async (config: any) => {
    return config;
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axiosInstance.interceptors.response.use(async (response: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    response.data = useApiResponseMiddleware(response.data);
    return response;
  });

  return children;
};
