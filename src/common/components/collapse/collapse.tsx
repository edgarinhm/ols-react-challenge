import { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";

type Easing = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";

interface CollapseProps extends ChildfullComponent {
  collapse: boolean;
  timeout: number;
  direction?: "vertical" | "horizontal";
  delay?: number;
  enterEasing?: Easing;
  exitEasing?: Easing;
}

/**
 * Runs a customizable collapse animation on its children.
 *
 * Takes changes in the size of the children into account using a ResizeObserver.This prevent snapping
 * when the animation starts or completes
 */
export const Collapse = (props: CollapseProps): JSX.Element => {
  const {
    collapse,
    timeout,
    direction = "vertical",
    delay = 0,
    enterEasing = "linear",
    exitEasing = enterEasing,
    children,
  } = props;

  const nodeRef = useRef<HTMLDivElement>(null);
  const targetCSSProperty = direction === "vertical" ? "height" : "width";
  const [targetSize, setTargetSize] = useState({ height: 0, width: 0 });

  const setTransitionPropertySize = () => {
    const transitions = {} as any;
    const height = targetSize.height;
    const width = targetSize.width;

    transitions[targetCSSProperty as keyof typeof transitions] =
      targetCSSProperty === "height" ? height : width;

    return transitions;
  };

  const [defaultStyle, setDefaultStyle] = useState({
    transition: `${targetCSSProperty} ${timeout}ms ${
      collapse ? enterEasing : exitEasing
    } ${delay}ms`,
  });

  const [transitionStyles, setTransitionStyles] = useState({
    exiting: { [targetCSSProperty]: 0, overflow: "hidden" },
    exited: {
      [targetCSSProperty]: 0,
      display: "none",
      transition: `${targetCSSProperty} ${timeout}ms ${enterEasing} ${delay}ms`,
    },
    entered: {
      transition: `${targetCSSProperty} ${timeout}ms ${exitEasing} ${delay}ms`,
    },
    entering: { overflow: "hidden" },
  });

  useEffect(() => {
    const sizeProperty = setTransitionPropertySize();

    setDefaultStyle({
      transition: `${targetCSSProperty} ${timeout}ms ${
        collapse ? enterEasing : exitEasing
      } ${delay}ms`,
      ...sizeProperty,
    });

    setTransitionStyles({
      exiting: { [targetCSSProperty]: 0, overflow: "hidden" },
      exited: {
        [targetCSSProperty]: 0,
        display: "none",
        transition: `${targetCSSProperty} ${timeout}ms ${enterEasing} ${delay}ms`,
      },
      entered: {
        transition: `${targetCSSProperty} ${timeout}ms ${exitEasing} ${delay}ms`,
        ...sizeProperty,
      },
      entering: { overflow: "hidden", ...sizeProperty },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetSize, direction, timeout, enterEasing, exitEasing, delay]);

  // get initial size
  useEffect(() => {
    if (nodeRef.current) {
      const height = nodeRef.current.offsetHeight;
      const width = nodeRef.current.offsetWidth;
      setTargetSize({
        width,
        height,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update size when children change
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (entry.target instanceof HTMLElement) {
        const height = entry.target.offsetHeight;
        const width = entry.target.offsetWidth;
        setTargetSize({
          width,
          height,
        });
      }
    });

    if (nodeRef.current && nodeRef.current.firstElementChild) {
      resizeObserver.observe(nodeRef.current.firstElementChild);
    }

    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return (
    <Transition nodeRef={nodeRef} in={collapse} timeout={timeout + delay}>
      {(state) => {
        return (
          <div
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state as keyof typeof transitionStyles],
            }}
          >
            {children}
          </div>
        );
      }}
    </Transition>
  );
};
