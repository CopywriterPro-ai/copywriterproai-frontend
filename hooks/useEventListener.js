import { useEffect, useRef } from "react";

const useEventListener = (eventName, handler, element) => {
  const savedHandler = useRef(null);

  useEffect(() => {
    const targetElement = element?.current || window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    if (savedHandler.current !== handler) {
      savedHandler.current = handler;
    }

    const eventListener = (event) => {
      if (!!savedHandler?.current) {
        savedHandler.current(event);
      }
    };

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, handler]);
};

export default useEventListener;
