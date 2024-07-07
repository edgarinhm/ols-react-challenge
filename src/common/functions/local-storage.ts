// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ParseLocalStorageValue = (value: string | null): any => {
  if (value === null || value === undefined) return null;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
