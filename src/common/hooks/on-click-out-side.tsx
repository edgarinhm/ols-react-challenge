import { MutableRefObject, useRef } from 'react';
import { useEventListener } from './event-listener';

export const useOnClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: (event: MouseEvent) => void
): void => {
  const docRef = useRef(document);
  useEventListener(
    'click',
    (event: MouseEvent) => {
      if (!ref?.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    },
    docRef
  );
};
