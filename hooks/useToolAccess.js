import { useState, useMemo, useEffect } from "react";

import useUser from "./useUser";
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

  useEffect(() => {
    const freemiumEligible =
      userAccess.userPackage === "freemium" && freeTrial?.eligible;
    if (!isRehydrated || !isAuth) {
      taskArr.map(() => setHasAccess((access) => [...access, false]));
    } else if (subscriberInfo.isPaidSubscribers || freemiumEligible) {
      taskArr.map((task) => {
        const unknownTask = unknownGrand && !toolaccess._all.includes(task);
        const grant = unknownTask || userAccess.packageAccess.includes(task);
        setHasAccess((access) => [...access, grant]);
      });
    } else {
      taskArr.map(() => setHasAccess((access) => [...access, false]));
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
  ]);

  return hasAccess;
};

export default useToolAccess;
