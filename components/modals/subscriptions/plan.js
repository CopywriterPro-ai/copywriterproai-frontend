import dayjs from "dayjs";
import { useMemo, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import prices from "@/data/price.json";
import {
  postUpdateSubscriptionPlan,
  selectors as paymentSelector,
} from "@/redux/slices/payment";
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
};

const SubscriptionsPlanModal = () => {
  const dispatch = useDispatch();

  const [currentSubsId, setCurrentSubsId] = useState(null);
  const {
    subscriptions: { cancel },
  } = useSelector(uiSelector.getModal);
  const { items: subscriptions, loading } = useSelector(
    paymentSelector.getSubscription
  );

  const handleCloseModal = () => {
    dispatch(setSubscriptionsCancelModal(false));
  };

  const formattedSubscriptions = useMemo(() => {
    if (subscriptions.length === 0) {
      return [];
    } else {
      return subscriptions.map((subscription) => {
        const priceKey = subscription.plan.metadata?.priceKey;
        const subscriptionName = prices[priceKey];
        return { ...subscription, packageName: subscriptionName.name };
      });
    }
  }, [subscriptions]);

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

  const handleUpdateSubscriptionPlan = (subId, bool) => {
    setCurrentSubsId(subId);
    dispatch(
      postUpdateSubscriptionPlan({
        data: { subscriptionId: subId, bool },
      })
    );
  };

  const isSubscriptionLoading = loading === "pending";

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
                    <strong>Words Left: </strong>3000
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

                  <StyledCancelSubscriptionBtn
                    disabled={isSubscriptionLoading}
                    onClick={() =>
                      !isSubscriptionLoading &&
                      handleUpdateSubscriptionPlan(subscription.id, true)
                    }
                  >
                    {isSubscriptionLoading &&
                    currentSubsId === subscription.id ? (
                      <span id="loading">Loading...</span>
                    ) : (
                      <span id="cancel">Cancel</span>
                    )}
                  </StyledCancelSubscriptionBtn>
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
                    <strong>Words Left: </strong>3000
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

                  <StyledCancelSubscriptionBtn
                    disabled={isSubscriptionLoading}
                    onClick={() =>
                      !isSubscriptionLoading &&
                      handleUpdateSubscriptionPlan(subscription.id, false)
                    }
                  >
                    {isSubscriptionLoading &&
                    currentSubsId === subscription.id ? (
                      <span id="loading">Loading...</span>
                    ) : (
                      <span id="cancel">Reactive</span>
                    )}
                  </StyledCancelSubscriptionBtn>
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
`;

const StyledSubscriptionContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 15px 10px;
    margin: 5px;
}
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

const StyledCancelSubscriptionBtn = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 1px solid #3a4841;
  outline: 0;
  color: black;
`;

export default SubscriptionsPlanModal;
