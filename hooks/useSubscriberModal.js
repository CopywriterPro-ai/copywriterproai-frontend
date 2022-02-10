import { useEffect, useState } from "react";

import useUser from "./useUser";

const useSubscriberModal = () => {
  const [showSubscriberModal, setShowSubscriberModal] = useState(false);
  const { isAuth, userInfo, subscribe, isRehydrated } = useUser();

  useEffect(() => {
    if (isRehydrated && isAuth) {
      if (subscribe?.words * 1 > 0 || userInfo?.role === "admin") {
        setShowSubscriberModal(false);
      } else setShowSubscriberModal(true);
    }
  }, [isAuth, isRehydrated, subscribe?.words, userInfo]);

  return showSubscriberModal;
};

export default useSubscriberModal;
