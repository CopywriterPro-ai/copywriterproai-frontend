import { useState, useEffect, useCallback, useMemo } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";

import {
  postSubscriptionSwitch,
  selectors as subscriberSelector,
} from "@/redux/slices/subscriber";
import {
  postCreateCustomer,
  postCreateCheckoutSession,
  getPriceList,
  setCurrentModalPrice,
  selectors as paymentSelector,
} from "@/redux/slices/payment";
import { stripe as getStripe, getRewardfulClientReferenceId } from "@/utils";
import { useSubscriberModal } from "@/hooks";
import { PricingCard, customStyles } from "./components/Price";
import {
  Container,
  StyledLoading,
  HeadingMessage,
  StyledCurrentPlan,
  StyledPeriodTab,
  StyledTabs,
  StyledTab,
  StyledUpgrade,
  StyledUpgradeButton,
} from "./styles";

const Subscriber = () => {
  const dispatch = useDispatch();

  const [periodSelect, setPeriodSelect] = useState(1);
  const [redirectCheckout, setRedirectCheckout] = useState(false);
  const [subsModal, setSubsModal] = useSubscriberModal();
  const {
    data: {
      subscriptionAll,
      activeSubscription: { words, subscription },
    },
  } = useSelector(subscriberSelector.getOwnSubscriber);
  const { current: currentSelectedPrice } = useSelector(
    paymentSelector.getModalPricing
  );
  const { items: priceItems, loading: loadingItems } = useSelector(
    paymentSelector.getPriceList(periodSelect)
  );
  const { id: customerId } = useSelector(paymentSelector.getCustomer);
  const { loading: checkoutLoading } = useSelector(paymentSelector.getCheckout);

  const closeModal = () => {
    setSubsModal({ ...subsModal, isOpen: false });
  };

  useEffect(() => {
    dispatch(getPriceList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentModalPrice(null));
  }, [dispatch, periodSelect]);

  useEffect(() => {
    if (!customerId) {
      dispatch(postCreateCustomer());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const selectedPriceItem = useCallback(() => {
    const findPrice = priceItems.find(
      (price) => price.id === currentSelectedPrice
    );
    return findPrice ? findPrice : {};
  }, [currentSelectedPrice, priceItems]);

  const { unit_amount, metadata } = selectedPriceItem();
  const currentPriceKey = metadata?.priceKey;
  const isCheckoutPending = checkoutLoading === "pending";
  const currentActivePackage = currentPriceKey === subscription;
  const canCheckout =
    !isCheckoutPending && currentSelectedPrice && !redirectCheckout;

  const canSwitch = useMemo(() => {
    const subs = subscriptionAll.find(
      (item) => item.subscription === currentPriceKey
    );
    if (!subs) {
      return { access: false };
    }
    return { access: true, subscriptionId: subs.subscriptionId };
  }, [currentPriceKey, subscriptionAll]);

  const handleCheckoutSessions = () => {
    if (canCheckout)
      dispatch(
        postCreateCheckoutSession({
          data: { priceId: currentSelectedPrice },
        })
      ).then(async ({ payload }) => {
        if (payload.status === 200) {
          setRedirectCheckout(true);
          const { data } = payload;
          const stripe = await getStripe();
          stripe?.redirectToCheckout({
            sessionId: data.session.id,
            clientReferenceId: getRewardfulClientReferenceId(),
          });
        }
      });
  };

  const handleSetCurrentSubsciption = () => {
    const canAction = canSwitch.access && !currentActivePackage;
    canAction &&
      dispatch(
        postSubscriptionSwitch({
          data: { subscriptionId: canSwitch.subscriptionId },
        })
      );
  };

  return (
    <Modal
      isOpen={subsModal.isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Subscriber Modal"
    >
      <Container>
        {(!words || subsModal.message) && (
          <HeadingMessage>
            <h4>{subsModal.message}</h4>
          </HeadingMessage>
        )}
        <StyledCurrentPlan>
          Current Plan: {subscription?.replace("_", " ")?.toLowerCase()}
        </StyledCurrentPlan>
        {loadingItems === "pending" && !priceItems.length ? (
          <StyledLoading>
            <Spinner />
          </StyledLoading>
        ) : (
          <>
            <StyledPeriodTab>
              <p>Select Your Plan</p>
              <StyledTabs>
                <StyledTab
                  Active={periodSelect === 1 ? "active" : "inactive"}
                  onClick={() => setPeriodSelect(1)}
                >
                  1 month
                </StyledTab>
                <StyledTab
                  Active={periodSelect === 6 ? "active" : "inactive"}
                  onClick={() => setPeriodSelect(6)}
                >
                  6 months
                </StyledTab>
              </StyledTabs>
            </StyledPeriodTab>
            <PricingCard priceItems={priceItems} />
            <StyledUpgrade>
              <StyledUpgradeButton
                onClick={
                  canSwitch.access
                    ? handleSetCurrentSubsciption
                    : handleCheckoutSessions
                }
                disabled={!canCheckout}
              >
                {canSwitch.access && !currentActivePackage
                  ? "Switch Now"
                  : currentSelectedPrice
                  ? `[$${unit_amount / 100}] ${
                      currentActivePackage ? "Current Active" : "Upgrade Now"
                    }`
                  : "Select Package"}
              </StyledUpgradeButton>
            </StyledUpgrade>
          </>
        )}
      </Container>
    </Modal>
  );
};

export default Subscriber;
