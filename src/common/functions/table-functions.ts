import { faSortDown, faSortUp, faSort, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export const GetSortIconClass = (
  isActiveSorterColumn: boolean,
  isAscending: boolean | undefined
): IconDefinition => {
  if (isActiveSorterColumn && isAscending) {
    return faSortUp;
  } else if (isActiveSorterColumn && !isAscending) {
    return faSortDown;
  } else {
    return faSort;
  }
};
