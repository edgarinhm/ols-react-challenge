import {
  autoUpdate,
  Placement,
  useFloating,
  Middleware,
} from '@floating-ui/react-dom-interactions';
import z from 'common/sass/styles/z-index.module.scss';
import { HTMLAttributes, ReactNode } from 'react';

export const Popover = ({
  isOpen,
  placement,
  children,
  actionElement,
  middleware,
  ...rest
}: {
  isOpen: boolean;
  placement: Placement;
  children: ReactNode;
  actionElement?: ReactNode;
  middleware?: Array<Middleware | null | undefined | false>;
} & HTMLAttributes<HTMLElement>): JSX.Element => {
  const {
    x,
    y,
    reference,
    floating: popoverRef,
    strategy,
  } = useFloating({
    placement: placement,
    whileElementsMounted: autoUpdate,
    middleware: middleware,
  });

  return (
    <div ref={reference}>
      {actionElement}
      {isOpen && (
        <div
          ref={popoverRef}
          style={{
            top: y ?? 0,
            left: x ?? 0,
            position: strategy,
            zIndex: z.zPopover,
          }}
        >
          <div {...rest}>{children}</div>
        </div>
      )}
    </div>
  );
};
