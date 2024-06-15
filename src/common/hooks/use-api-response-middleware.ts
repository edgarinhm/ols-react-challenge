import * as changeKeys from 'change-case/keys';

export const useApiResponseMiddleware = (data: any) => {
  return Array.isArray(data)
    ? data.map((data) => changeKeys.camelCase(data))
    : changeKeys.camelCase(data);
};
