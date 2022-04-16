import { useState, useEffect, useCallback, useMemo } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";

import {
  postSubscriptionSwitch,
  selectors as subscriberSelector,
} from "@/redux/slices/subscriber";
import {
  postCreateCheckoutSession,
  getPriceList,
  setCurrentModalPrice,
  selectors as paymentSelector,
} from "@/redux/slices/payment";
import { selectors as uiSelector, setAccessTask } from "@/redux/slices/ui";
import { stripe as getStripe, getRewardfulClientReferenceId } from "@/utils";
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

const SubscriberAccess = () => {
  const dispatch = useDispatch();

  const [periodSelect, setPeriodSelect] = useState(1);
  const [redirectCheckout, setRedirectCheckout] = useState(false);
  const { taskaccess } = useSelector(uiSelector.getModal);
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
  const { loading: checkoutLoading } = useSelector(paymentSelector.getCheckout);

  const closeModal = () => {
    dispatch(setAccessTask({ ...taskaccess, isOpen: false, message: null }));
  };

  useEffect(() => {
    dispatch(getPriceList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentModalPrice(null));
  }, [dispatch, periodSelect]);

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
      isOpen={taskaccess.isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Subscriber Modal"
    >
      <Container>
        {(!words || taskaccess.message) && (
          <HeadingMessage>
            <strong>{taskaccess.message}</strong>
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

export default SubscriberAccess;
