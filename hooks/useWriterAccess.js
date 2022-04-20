import { useState, useEffect } from "react";

import useUser from "./useUser";

const BLOCK_ACCESS_WRITER = ["BASIC_1MONTH", "BASIC_6MONTH"];

const useWriterAccess = () => {
  const [hasAccess, setHasAccess] = useState(true);

  const { isRehydrated, isAuth, subscribe } = useUser();
  const { subscription } = subscribe.activeSubscription;

  useEffect(() => {
    if (isRehydrated && isAuth) {
      const grant = BLOCK_ACCESS_WRITER.includes(subscription);
      setHasAccess(!grant);
    } else {
      setHasAccess(true);
    }
  }, [isAuth, isRehydrated, subscription]);

  return hasAccess;
};

export default useWriterAccess;
