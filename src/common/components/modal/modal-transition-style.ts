import { CSSProperties } from "react";

export const fadeStyle: CSSProperties = {
  transition: `opacity 150ms linear`,
  opacity: 0,
};

export const scrollContainerStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export const backgroundStyles = {
  entering: { opacity: 0.5 },
  entered: { opacity: 0.5 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export const transformStyle: CSSProperties = {
  transform: "translate(0, -25%)",
  transition: "transform 300ms ease-out",
};

export const dialogStyles = {
  entering: { transform: "translate(0, 0)" },
  entered: { transform: "translate(0, 0)" },
  exiting: { transform: "translate(0, -25%)" },
  exited: { transform: "translate(0, -25%)" },
};
