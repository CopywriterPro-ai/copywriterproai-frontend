import { useEffect, useRef } from "react";
import invariant from "tiny-invariant";

const useBeforeunload = (handler) => {
  invariant(
    handler == null || typeof handler === "function",
    "Expected `handler` to be a function"
  );

  const eventListenerRef = useRef();

  useEffect(() => {
    eventListenerRef.current = (event) => {
      const returnValue = handler?.(event);
      if (typeof returnValue === "string") {
        return (event.returnValue = returnValue);
      }
      if (event.defaultPrevented) {
        return (event.returnValue = "");
      }
    };
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => {
      eventListenerRef.current(event);
    };
    window.addEventListener("beforeunload", eventListener);
    return () => {
      window.removeEventListener("beforeunload", eventListener);
    };
  }, []);
};

export default useBeforeunload;
