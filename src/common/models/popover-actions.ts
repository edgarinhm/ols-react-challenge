import { ReactNode } from "react";

export type PopoverActions = {
  text: string;
  action: () => void;
  disabled?: boolean;
};

export type PopoverActionsIcon = Omit<PopoverActions, "text"> & {
  icon: ReactNode;
  idKey: string | number;
  children?: ReactNode;
  text?: string;
};
