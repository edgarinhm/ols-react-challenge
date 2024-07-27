/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusSortOrder } from "./status-functions";

export const SortObjects = <T>(
  data: T[],
  sortField?: { [K in keyof T]: T[K] extends Record<string, unknown> ? never : K }[keyof T],
  isDescending?: boolean,
  customSortOrder?: (value: any) => number,
  sortNullLastWhileAscending?: boolean
): T[] => {
  if (sortField) {
    const dataCopy = [...data]; // copy to avoid mutating original array
    const IsDefined = <T>(item: number | T[keyof T]) => typeof item === "boolean" || !!item;

    return dataCopy.sort((a, b) => {
      const item1 = customSortOrder ? customSortOrder(a[sortField]) : a[sortField];
      const item2 = customSortOrder ? customSortOrder(b[sortField]) : b[sortField];

      // sort null and undefined last when ascending
      if (sortNullLastWhileAscending && !IsDefined(item1) && !IsDefined(item2)) return 0;
      if (sortNullLastWhileAscending && !IsDefined(item1)) return isDescending ? -1 : 1;
      if (sortNullLastWhileAscending && !IsDefined(item2)) return isDescending ? 1 : -1;

      // sort null and undefined first when ascending
      if (!IsDefined(item1) && !IsDefined(item2)) return 0;
      if (!IsDefined(item1)) return isDescending ? 1 : -1;
      if (!IsDefined(item2)) return isDescending ? -1 : 1;

      return (item1 === item2 ? 0 : item1 > item2 ? 1 : -1) * (isDescending ? -1 : 1);
    });
  }

  return data;
};

export const SortNestedObjects = <T>(
  data: T[],
  sortField: (sortField: keyof T) => T[keyof T],
  isDescending?: boolean,
  customSortOrder?: (value: any) => number
): T[] => {
  throw Error(`Not Implemented ${data}-${isDescending}-${sortField}-${customSortOrder}`);
};

export const HandleSorting = <T>(
  fieldName: string,
  sortOrder: boolean,
  data: T[],
  isStatusField?: boolean
): T[] => {
  if (fieldName) {
    const sorted = data.sort((a: any, b: any) => {
      const item1 = !isStatusField ? a[fieldName] : StatusSortOrder(a[fieldName]);
      const item2 = !isStatusField ? b[fieldName] : StatusSortOrder(b[fieldName]);

      if (item1 === null && item2 === null) return 0;
      if (item1 === null) return sortOrder ? -1 : 1;
      if (item2 === null) return sortOrder ? 1 : -1;

      if (!isNaN(item1) && !isNaN(item2)) {
        const num1 = Number(item1);
        const num2 = Number(item2);

        return num1 === num2 ? 0 : (num1 > num2 ? 1 : -1) * (sortOrder ? 1 : -1);
      }

      return (
        item1.toString().localeCompare(item2.toString(), "en", {
          numeric: true,
        }) * (sortOrder ? 1 : -1)
      );
    });

    return sorted;
  }

  return data;
};

export const SortLocalCompare = <T>(data: T[], sortField: keyof T): T[] => {
  return data.sort((a, b) => {
    const item1 = String(a[sortField]);
    const item2 = String(b[sortField]);

    if (!isNaN(parseInt(item1, 10)) && isNaN(parseInt(item2, 10))) {
      return item1 === item2 ? 0 : item1 > item2 ? 1 : -1;
    } else {
      return item1.localeCompare(item2, undefined, { numeric: true });
    }
  });
};
