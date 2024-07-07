import * as changeKeys from "change-case/keys";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useApiResponseMiddleware = (data: any) => {
  return Array.isArray(data)
    ? data.map((data) => changeKeys.camelCase(data))
    : changeKeys.camelCase(data);
};
