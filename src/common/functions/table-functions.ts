import {
  faSortDown,
  faSortUp,
  faSort,
  IconDefinition,
  faCheck,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

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

export const GetCiCdIconClass = (value: boolean): IconDefinition => {
  if (value === true) {
    return faCheck;
  } else {
    return faCircle;
  }
};
