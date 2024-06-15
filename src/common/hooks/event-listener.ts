import { MutableRefObject, useEffect, useRef } from 'react';

export const useEventListener = <K extends keyof GlobalEventHandlersEventMap>(
  eventName: K,
  callback: (event: GlobalEventHandlersEventMap[K]) => void,
  elementRef?: MutableRefObject<Document | HTMLElement>,
  options?: AddEventListenerOptions
): void => {
  const listenerRef = useRef(callback);
  useEffect(() => {
    listenerRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const target = elementRef?.current || window;
    const listener: typeof callback = (event) => listenerRef.current(event);

    target.addEventListener(eventName, listener as EventListener, options);

    return () =>
      target.removeEventListener(eventName, listener as EventListener, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName, options]);
};
