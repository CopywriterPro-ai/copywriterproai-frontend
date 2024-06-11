import { useState, useMemo, useEffect } from "react";

import useUser from "./useUser";
import toolaccess from "@/data/toolaccess";

const useToolAccess = (taskArr = [], unknownGrand = false) => {
  const [hasAccess, setHasAccess] = useState("[]");
  const { isRehydrated, isAuth, subscribe } = useUser();
  const { subscriberInfo, activeSubscription, freeTrial } = subscribe;
  const { subscription } = activeSubscription;
  const { isPaidSubscribers } = subscriberInfo;

  const user = useMemo(() => {
    if (subscription) {
      const userPackage = subscription.split("_")[0].toLowerCase();
      const packageAccess = toolaccess[userPackage];
      return { userPackage, packageAccess };
    } else {
      return { userPackage: "", packageAccess: [] };
    }
  }, [subscription]);

  const taskState = useMemo(() => {
    return taskArr.filter((task) => Boolean(task));
  }, [taskArr]);

  useEffect(() => {
    if (taskState.length) {
      const freemiumEligible =
        user.userPackage === "freemium" && freeTrial?.eligible;
      const ready = isRehydrated && isAuth;
      if ((ready && isPaidSubscribers) || (ready && freemiumEligible)) {
        const accessArr = taskState.map((task) => {
          const unknownTask = unknownGrand && !toolaccess._all.includes(task);
          return unknownTask || user.packageAccess.includes(task);
        });
        setHasAccess(JSON.stringify(accessArr));
      } else {
        const accessArr = taskState.map(() => false);
        setHasAccess(JSON.stringify(accessArr));
      }
    }
  }, [
    freeTrial?.eligible,
    isAuth,
    isPaidSubscribers,
    isRehydrated,
    taskState,
    unknownGrand,
    user,
  ]);

  const taskAccess = useMemo(() => {
    if (typeof hasAccess === "string") {
      const json = JSON.parse(hasAccess);
      return Array.isArray(json) ? json : [];
    }
    return [];
  }, [hasAccess]);

  return taskAccess;
};

export default useToolAccess;
