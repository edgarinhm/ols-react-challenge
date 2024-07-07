import {
  arrow,
  flip,
  offset,
  Placement,
  shift,
  useFloating,
} from "@floating-ui/react-dom-interactions";
import {
  ReactNode,
  useRef,
  CSSProperties,
  PropsWithChildren,
  Children,
  ReactElement,
  cloneElement,
} from "react";
import { CSSTransition } from "react-transition-group";
import { mergeRefs } from "common/functions/merge.refs";
import styles from "./tooltip.module.scss";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
type TooltipAlignment = "start" | "center" | "end";
type ArrowProperties = Pick<CSSProperties, "top" | "left" | "bottom" | "right">;

interface TooltipProps extends PropsWithChildren {
  content: ReactNode;
  open: boolean;
  placement?: TooltipPlacement;
  alignment?: TooltipAlignment;
  maxWidth?: number;
  className?: string;
}

const arrowSize = 6;
const animationDuration = 500;

export const Tooltip = (props: TooltipProps): JSX.Element => {
  const {
    content,
    open,
    children,
    placement = "top",
    alignment = "center",
    maxWidth,
    className = "",
  } = props;
  const arrowRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef(null);

  // floating UI
  const fuiPlacement = `${
    alignment === "center" ? placement : `${placement}-${alignment}`
  }` as Placement;

  const {
    x,
    y,
    reference,
    floating: tooltipRef,
    strategy,
    middlewareData,
    placement: finalPlacement,
  } = useFloating({
    placement: fuiPlacement,
    middleware: [
      offset(10),
      flip(),
      shift({ padding: 5 }),
      arrow({ element: arrowRef, padding: 6 }),
    ],
  });

  const arrowData = middlewareData.arrow;

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[finalPlacement.split("-")[0]] as keyof ArrowProperties;

  const child = Children.only(children) as ReactElement;

  const clonedChildren = cloneElement(child, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: mergeRefs(reference, (child as any).ref),
  });

  return (
    <>
      {clonedChildren}
      <CSSTransition
        in={open}
        appear
        timeout={animationDuration}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.tooltipEnter,
          enterActive: styles.tooltipEnterActive,
          appear: styles.tooltipAppear,
          appearActive: styles.tooltipAppearActive,
          exit: styles.tooltipExit,
          exitActive: styles.tooltipExitActive,
        }}
        nodeRef={transitionRef}
      >
        <div
          style={{ top: y ?? 0, left: x ?? 0, position: strategy, maxWidth }}
          ref={mergeRefs(tooltipRef, transitionRef)}
          className={`${styles.tooltip} ${className}`}
          data-qa="tooltip"
        >
          {content}
          <div
            ref={arrowRef}
            style={{
              top: arrowData?.y ?? "",
              left: arrowData?.x ?? "",
              height: `${arrowSize}px`,
              width: `${arrowSize}px`,
              [staticSide]: `-${arrowSize / 2}px`,
            }}
            className={styles.arrow}
          />
        </div>
      </CSSTransition>
    </>
  );
};
