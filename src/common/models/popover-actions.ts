import { ReactNode } from "react";

export type PopoverActions = {
  text: string;
  action: () => void;
  disabled?: boolean;
};

export type PopoverActionsIcon = PopoverActions & {
  icon: ReactNode;
};
