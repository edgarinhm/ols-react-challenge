export const ParseLocalStorageValue = (value: string | null): any => {
  if (value === null || value === undefined) return null;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
