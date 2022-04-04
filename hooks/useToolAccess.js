import { useState, useMemo, useEffect } from "react";

import useUser from "./useUser";
// import useDeepCompareEffect from "./useDeepCompareEffect";
import toolaccess from "@/data/toolaccess";

const useToolAccess = (taskArr = [], unknownGrand = true) => {
  const [hasAccess, setHasAccess] = useState([]);
  const { isRehydrated, isAuth, subscribe } = useUser();
  const { subscriberInfo, subscription, freeTrial } = subscribe;

  const userAccess = useMemo(() => {
    const subscriptionName = subscription.split("_")[0];
    const userPackage = subscriptionName.toLowerCase();
    const packageAccess = toolaccess[userPackage];
    return { userPackage, packageAccess };
  }, [subscription]);

  const taskState = useMemo(() => {
    return taskArr.filter((task) => Boolean(task));
  }, [taskArr]);

  useEffect(() => {
    if (taskState.length) {
      const freemiumEligible =
        userAccess.userPackage === "freemium" && freeTrial?.eligible;
      if (!isRehydrated || !isAuth) {
        taskState.map(() => setHasAccess((access) => [...access, false]));
      } else if (subscriberInfo.isPaidSubscribers || freemiumEligible) {
        taskState.map((task) => {
          const unknownTask = unknownGrand && !toolaccess._all.includes(task);
          const grant = unknownTask || userAccess.packageAccess.includes(task);
          setHasAccess((access) => [...access, grant]);
        });
      } else {
        taskState.map(() => setHasAccess((access) => [...access, false]));
      }
    }
    return () => {
      setHasAccess([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    freeTrial?.eligible,
    isAuth,
    isRehydrated,
    subscriberInfo.isPaidSubscribers,
    userAccess,
    // taskState,
  ]);

  return hasAccess;
};

export default useToolAccess;
