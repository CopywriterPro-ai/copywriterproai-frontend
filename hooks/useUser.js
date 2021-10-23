import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectors as authSelector } from "@/redux/slices/auth";
import { selectors as subscriberSelector } from "redux/slices/subscriber";

const useUser = () => {
  const {
    auth: { isAuth, accessToken, refreshToken },
    info,
  } = useSelector(authSelector.getAuth);
  const subscribe = useSelector(subscriberSelector.getOwnSubscriber);

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

  return user;
};

export default useUser;
