import humps from "humps";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useApiResponseMiddleware = (data: any): any => {
  return humps.camelizeKeys(data);
};
