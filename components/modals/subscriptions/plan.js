import dayjs from "dayjs";
import { useMemo, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import prices from "@/data/price.json";
import { selectors as paymentSelector } from "@/redux/slices/payment";
import {
  postSubscriptionSwitch,
  selectors as subscriberSelector,
} from "@/redux/slices/subscriber";
import {
  selectors as uiSelector,
  setSubscriptionsCancelModal,
} from "@/redux/slices/ui";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: { zIndex: 9999 },
};

const SubscriptionSwitchBtn = ({
  isSubscriptionLoading,
  selectedSubscription,
  currentSubscriptionId,
  subscription,
  handleSetCurrentSubsciption,
}) => {
  const subsId = subscription.id;
  const isLoading = subsId === selectedSubscription && isSubscriptionLoading;
  const isCurrent = currentSubscriptionId === subsId;

  return (
    <StyledActivingSubscriptionBtn
      IsCurrent={isCurrent.toString()}
      onClick={() => handleSetCurrentSubsciption(subsId, isCurrent)}
    >
      {isCurrent ? "Current" : isLoading ? "Loading" : "Active"}
    </StyledActivingSubscriptionBtn>
  );
};

const SubscriptionsPlanModal = () => {
  const dispatch = useDispatch();

  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const {
    subscriptions: { cancel },
  } = useSelector(uiSelector.getModal);
  const { items: subscriptions } = useSelector(paymentSelector.getSubscription);
  const {
    payment: { items: paymentItems },
  } = useSelector(paymentSelector.getPayment);

  const {
    loading,
    data: {
      activeSubscription: { subscriptionId, words: currentWords },
    },
  } = useSelector(subscriberSelector.getOwnSubscriber);

  const handleCloseModal = () => {
    dispatch(setSubscriptionsCancelModal(false));
  };

  const formattedSubscriptions = useMemo(() => {
    if (subscriptions.length === 0) {
      return [];
    } else {
      return subscriptions.map((subscription) => {
        const paymentItem = paymentItems.find(
          (item) => item.subscriptionId === subscription.id
        );
        const priceKey = subscription.plan.metadata?.priceKey;
        const subscriptionName = prices[priceKey];
        return {
          ...subscription,
          packageName: subscriptionName.name,
          words: paymentItem?.words ? paymentItem.words : 0,
        };
      });
    }
  }, [paymentItems, subscriptions]);

  const RecurringSubscriptions = useMemo(() => {
    return formattedSubscriptions.filter(
      (sub) => sub.cancel_at_period_end === false
    );
  }, [formattedSubscriptions]);

  const CanceledSubscriptions = useMemo(() => {
    return formattedSubscriptions.filter(
      (sub) => sub.cancel_at_period_end === true
    );
  }, [formattedSubscriptions]);

  const isSubscriptionLoading = loading === "pending";

  const handleSetCurrentSubsciption = (subId, isCurrent) => {
    if (!isCurrent && !isSubscriptionLoading) {
      setSelectedSubscription(subId);
      // dispatch(setCurrentSubscriptionWords({ subId, currentWords }));
      dispatch(postSubscriptionSwitch({ data: { subscriptionId: subId } }));
    }
  };

  return (
    <Modal
      isOpen={cancel}
      onRequestClose={handleCloseModal}
      style={customStyles}
      contentLabel="Subscriptions Modal"
    >
      <StyledContainer>
        {formattedSubscriptions.length === 0 && (
          <h4>You have no any plan Subscription</h4>
        )}
        {formattedSubscriptions.length > 0 && <h2>Subscriptions List</h2>}
        <StyledSubscriptionContainer>
          {RecurringSubscriptions.length > 0 &&
            RecurringSubscriptions.map((subscription) => (
              <StyledSubscriptionContainerItem key={subscription.id}>
                <StyledSubscriptionBox>
                  <div>
                    <strong>{subscription.packageName}</strong>
                  </div>
                  <div>
                    <strong>Words Left: </strong>
                    {subscriptionId === subscription.id
                      ? currentWords
                      : subscription.words}
                  </div>
                  <div>
                    <strong>Purchase Date: </strong>{" "}
                    {dayjs.unix(subscription.created).format("MMMM D, YYYY")}
                  </div>
                  <div>
                    <strong>Next Billing Date: </strong>{" "}
                    {dayjs
                      .unix(subscription.current_period_end)
                      .format("MMMM D, YYYY")}
                  </div>
                  <div>
                    <SubscriptionSwitchBtn
                      isSubscriptionLoading={isSubscriptionLoading}
                      selectedSubscription={selectedSubscription}
                      subscription={subscription}
                      currentSubscriptionId={subscriptionId}
                      handleSetCurrentSubsciption={handleSetCurrentSubsciption}
                    />
                  </div>
                </StyledSubscriptionBox>
              </StyledSubscriptionContainerItem>
            ))}
        </StyledSubscriptionContainer>
        {CanceledSubscriptions.length > 0 && <p>Cancelled</p>}
        <StyledSubscriptionContainer>
          {CanceledSubscriptions.length > 0 &&
            CanceledSubscriptions.map((subscription) => (
              <StyledSubscriptionContainerItem key={subscription.id}>
                <StyledSubscriptionBox>
                  <div>
                    <strong>{subscription.packageName}</strong>
                  </div>
                  <div>
                    <strong>Words Left: </strong>{" "}
                    {subscriptionId === subscription.id
                      ? currentWords
                      : subscription.words}
                  </div>
                  <div>
                    <strong>Purchase Date: </strong>{" "}
                    {dayjs.unix(subscription.created).format("MMMM D, YYYY")}
                  </div>
                  <div>
                    <strong>Subscription Expire Date: </strong>
                    {dayjs
                      .unix(subscription.current_period_end)
                      .format("MMMM D, YYYY")}
                  </div>
                  <div>
                    <SubscriptionSwitchBtn
                      isSubscriptionLoading={isSubscriptionLoading}
                      selectedSubscription={selectedSubscription}
                      subscription={subscription}
                      currentSubscriptionId={subscriptionId}
                      handleSetCurrentSubsciption={handleSetCurrentSubsciption}
                    />
                  </div>
                </StyledSubscriptionBox>
              </StyledSubscriptionContainerItem>
            ))}
        </StyledSubscriptionContainer>
      </StyledContainer>
    </Modal>
  );
};

const StyledContainer = styled.div`
  max-height: 80vh;
  overflow: hidden scroll;
  max-width: 800px;

  &::-webkit-scrollbar {
    width: 2px;
    height: 0;
    border-radius: 10px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: inherit;
  }
`;

const StyledSubscriptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 15px 10px;
  margin: 5px;
`;

const StyledSubscriptionContainerItem = styled.div`
  flex: 48%;
`;

const StyledSubscriptionBox = styled.div`
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 8px;
`;

const StyledActivingSubscriptionBtn = styled.button`
  cursor: ${({ IsCurrent }) =>
    IsCurrent === "true" ? "not-allowed !important" : "pointer !important"};
  background: transparent;
  border-radius: 3px;
  border: 1px solid #3a4841;
  outline: 0;
  color: black;
`;

export default SubscriptionsPlanModal;
