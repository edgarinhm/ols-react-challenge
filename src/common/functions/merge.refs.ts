import React from "react";

export const mergeRefs = <T>(
  ...refs: (React.MutableRefObject<T> | React.RefCallback<T> | React.ForwardedRef<T>)[]
): React.RefCallback<T> => {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref !== null && ref !== undefined) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    }
  };
};
