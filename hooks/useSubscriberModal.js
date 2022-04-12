import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setSubscriberUsageModal,
  selectors as uiSelector,
} from "@/redux/slices/ui";
import useUser from "./useUser";

const useSubscriberModal = () => {
  const dispatch = useDispatch();

  const { isAuth, subscribe, isRehydrated } = useUser();
  const { subscriber: subscriberModalState } = useSelector(uiSelector.getModal);

  useEffect(() => {
    const isReady = isRehydrated && isAuth;
    if (isReady) {
      const { activeSubscription, freeTrial, subscriberInfo } = subscribe;
      const words = activeSubscription.words;
      const isFreemium =
        activeSubscription.subscription === "Freemium" && freeTrial.eligible;
      const isPaid = subscriberInfo.isPaidSubscribers;
      const wordsFinished = words <= 0;

      if (isPaid && wordsFinished) {
        dispatch(
          setSubscriberUsageModal({
            block: true,
            isOpen: true,
            message: "your subscription words finished",
          })
        );
      } else if (isFreemium && wordsFinished) {
        dispatch(
          setSubscriberUsageModal({
            block: true,
            isOpen: true,
            message: "your freemium subscription words finished",
          })
        );
      } else {
        dispatch(
          setSubscriberUsageModal({
            block: false,
            isOpen: false,
            message: null,
          })
        );
      }
    }
  }, [dispatch, isAuth, isRehydrated, subscribe]);

  const setSubscriberUsageModalState = (state) => {
    dispatch(setSubscriberUsageModal({ ...state }));
  };

  return [subscriberModalState, setSubscriberUsageModalState];
};

export default useSubscriberModal;
