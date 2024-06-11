import { useEffect, useState } from "react";
import useEventListener from "./useEventListener";

const usePageIsVisible = () => {
  const [isVisible, setIsVisible] = useState(true);

  const updateVisible = () => setIsVisible(!document.hidden);

  useEffect(() => {
    updateVisible();
  }, []);

  useEventListener("visibilitychange", updateVisible);

  return isVisible;
};

export default usePageIsVisible;
