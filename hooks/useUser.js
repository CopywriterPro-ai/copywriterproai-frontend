import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectors as authSelector } from "@/redux/slices/auth";
import { selectors as subscriberSelector } from "redux/slices/subscriber";
import globalSelectors from "@/redux/selectors";

const useUser = () => {
  const {
    auth: { isAuth, accessToken, refreshToken },
    info,
  } = useSelector(authSelector.getAuth);
  const subscribe = useSelector(subscriberSelector.getOwnSubscriber);
  const isRehydrated = useSelector(globalSelectors.getPersist);

  const [rehydrated, setRehydrated] = useState(false);
  const [user, setUser] = useState({
    isAuth,
    authToken: { accessToken, refreshToken },
    userInfo: info.data,
    subscribe: subscribe.data,
  });

  useEffect(() => {
    setUser({
      isAuth,
      authToken: { accessToken, refreshToken },
      userInfo: info.data,
      subscribe: subscribe.data,
    });
  }, [accessToken, info.data, isAuth, refreshToken, subscribe.data]);

  useEffect(() => {
    if (isRehydrated) {
      setRehydrated(true);
    }
  }, [isRehydrated]);

  return { ...user, isRehydrated: rehydrated };
};

export default useUser;
