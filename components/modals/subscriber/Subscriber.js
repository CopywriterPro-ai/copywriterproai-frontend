import { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";

import { selectors as subscriberSelector } from "@/redux/slices/subscriber";
import {
  postCreateCustomer,
  postCreateCheckoutSession,
  getPriceList,
  setCurrentModalPrice,
  selectors as paymentSelector,
} from "@/redux/slices/payment";
import {
  selectors as uiSelector,
  setSubscriberUsageModal,
} from "@/redux/slices/ui";
import { stripe as getStripe } from "@/utils";
import { useResponsive } from "@/hooks";
import pricesInfo from "@/data/price.json";

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

const POPULAR_PACKAGE = ["PROFESSINAL_6MONTH"];

const MobilePriceCardItem = ({ price }) => {
  const packageWords = pricesInfo[price.metadata.priceKey]?.words;

  return (
    <div style={{ padding: "1rem" }}>
      <StyledCardRow>
        <StyledRowIcon className="fas fa-database"></StyledRowIcon>
        <StyledRowTitle>{packageWords} Words</StyledRowTitle>
      </StyledCardRow>
      <StyledCardRow>
        <StyledRowIcon className="far fa-edit"></StyledRowIcon>
        <StyledRowTitle>Short-form writing tools</StyledRowTitle>
      </StyledCardRow>
      <StyledCardRow>
        <StyledRowIcon className="fas fa-wrench"></StyledRowIcon>
        <StyledRowTitle>24/7 Support</StyledRowTitle>
      </StyledCardRow>
    </div>
  );
};

const PriceCardItem = ({ price }) => {
  const dispatch = useDispatch();

  const { current } = useSelector(paymentSelector.getModalPricing);
  const isPopular = POPULAR_PACKAGE.includes(price.metadata?.priceKey);
  const selectedPackage = price.id === current;

  const packageWords = pricesInfo[price.metadata.priceKey]?.words;

  return (
    <StyledPriceCardItem IsActive={selectedPackage}>
      {isPopular && (
        <StyledRibbon>
          <span>Popular</span>
        </StyledRibbon>
      )}

      <label>
        <StyledCardRow>
          <input
            onChange={() => dispatch(setCurrentModalPrice(price.id))}
            type="radio"
            name="price"
          />
          <StyledPriceTitle>{price.product.name}</StyledPriceTitle>
        </StyledCardRow>
        <StyledCardRow>
          <StyledRowIcon className="fas fa-database"></StyledRowIcon>
          <StyledRowTitle>{packageWords} Words</StyledRowTitle>
        </StyledCardRow>
        <StyledCardRow>
          <StyledRowIcon className="far fa-edit"></StyledRowIcon>
          <StyledRowTitle>Short-form writing tools</StyledRowTitle>
        </StyledCardRow>
        <StyledCardRow>
          <StyledRowIcon className="fas fa-wrench"></StyledRowIcon>
          <StyledRowTitle>24/7 Support</StyledRowTitle>
        </StyledCardRow>
      </label>
    </StyledPriceCardItem>
  );
};

const StyledPriceCardItem = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 7px;
  border: 1px solid
    ${({ IsActive }) =>
      IsActive.toString() === "true" ? "#00DA3D" : "#dddddd"};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  margin: 8px;
  padding: 15px;
  width: 20rem;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  label {
    cursor: pointer;
    width: 100%;
    user-select: none;
  }
`;

const StyledRibbon = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 1;
  overflow: hidden;
  width: 75px;
  height: 75px;
  text-align: right;

  span {
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    line-height: 20px;
    transform: rotate(45deg);
    width: 100px;
    display: block;
    background: #3a95e9;
    position: absolute;
    top: 20px;
    right: -20px;

    &::before {
      content: "";
      position: absolute;
      left: 0px;
      top: 100%;
      z-index: -1;
      border-left: 2px solid #3a95e9;
      border-right: 2px solid transparent;
      border-bottom: 2px solid transparent;
      border-top: 2px solid #3a95e9;
    }

    &::after {
      content: "";
      position: absolute;
      right: 0%;
      top: 100%;
      z-index: -1;
      border-right: 2px solid #3a95e9;
      border-left: 2px solid transparent;
      border-bottom: 2px solid transparent;
      border-top: 2px solid #3a95e9;
    }
  }
`;

const StyledCardRow = styled.div`
  margin: 1.5rem 0;
  display: flex;
  align-items: baseline;

  input[type="radio"] {
    margin-right: 1rem;
    transform: scale(1.3);
  }
`;

const StyledRowIcon = styled.div`
  padding: 0.7rem;
  background: #ffffff;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  margin-right: 1rem;
  color: #707070;
`;

const StyledRowTitle = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
`;

const StyledPriceTitle = styled.span`
  font-weight: 600;
  font-size: 18px;
`;

const PricingCard = ({ priceItems }) => {
  const dispatch = useDispatch();
  const [currentPrice, setCurrentPrice] = useState(priceItems[0]);
  const { isDesktop, isMobile } = useResponsive();
  const { current } = useSelector(paymentSelector.getModalPricing);

  if (isDesktop) {
    return (
      <StyledPricingCard>
        {priceItems.map((price) => (
          <PriceCardItem key={price.id} price={price} />
        ))}
      </StyledPricingCard>
    );
  } else if (isMobile) {
    return (
      <StyledMobilePricingCard>
        <StyledMobilePricingCardTitle>
          {priceItems.map((price) => (
            <StyledMobilePricingCardButton
              onClick={() => {
                setCurrentPrice(price);
                dispatch(setCurrentModalPrice(price.id));
              }}
              key={price.id}
              IsActive={price.id === current ? "active" : "inactive"}
            >
              {price.product?.name}
            </StyledMobilePricingCardButton>
          ))}
        </StyledMobilePricingCardTitle>
        <MobilePriceCardItem price={currentPrice} />
      </StyledMobilePricingCard>
    );
  }
  return null;
};

const StyledPricingCard = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledMobilePricingCard = styled.div`
  border: 1px solid #000000;
  border-radius: 7px;
  overflow: hidden;
`;

const StyledMobilePricingCardTitle = styled.div`
  display: flex;
  border-bottom: 1px solid #000;
`;

const StyledMobilePricingCardButton = styled.div`
  padding: 5px 0px;
  width: 100%;
  text-align: center;
  background-color: ${({ IsActive }) =>
    IsActive === "active" ? "#3A95E9" : null};
  border-right: 1px solid #000;
  font-weight: 600;
  font-size: 14px;
  color: ${({ IsActive }) => (IsActive === "active" ? "#FFF" : "#000")};

  &:last-child {
    border-right: 0;
  }
`;

const Subscriber = () => {
  const dispatch = useDispatch();

  const [periodSelect, setPeriodSelect] = useState(1);
  const [redirectCheckout, setRedirectCheckout] = useState(false);
  const { subscriber } = useSelector(uiSelector.getModal);
  const {
    data: { words, subscription },
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
    dispatch(setSubscriberUsageModal({ usage: false }));
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
  const isCheckoutPending = checkoutLoading === "pending";
  const currentActivePackage = metadata?.priceKey === subscription;
  const canCheckout =
    !isCheckoutPending && currentSelectedPrice && !redirectCheckout;

  const handleCheckoutSessions = () => {
    if (canCheckout)
      dispatch(
        postCreateCheckoutSession({
          data: { customerId, priceId: currentSelectedPrice },
        })
      ).then(async ({ payload }) => {
        if (payload.status === 200) {
          setRedirectCheckout(true);
          const { data } = payload;
          const stripe = await getStripe();
          stripe?.redirectToCheckout({
            sessionId: data.session.id,
          });
        }
      });
  };

  return (
    <Modal
      isOpen={subscriber?.usage}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Subscriber Modal"
    >
      <Container>
        {(!words || subscriber.message) && (
          <HeadingMessage>
            <h4>{subscriber.message}</h4>
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
                onClick={handleCheckoutSessions}
                disabled={!canCheckout}
              >
                {currentSelectedPrice
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

const Container = styled.div`
  position: relative;
`;

const StyledLoading = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeadingMessage = styled.div`
  margin-bottom: 2rem;
  h4 {
    font-weight: 600;
    font-size: 25px;
  }

  @media (max-width: 768px) {
    h4 {
      font-weight: 500;
      font-size: 20px;
    }
  }
`;

const StyledCurrentPlan = styled.div`
  text-transform: capitalize;
  font-weight: 500;
  font-size: 15px;
`;

const StyledPeriodTab = styled.div`
  margin: 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    position: absolute;
    left: 0;
    margin: 0;
    font-weight: 600;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    p {
      position: relative;
      align-self: flex-start;
      font-size: 16px;
      margin-bottom: 1rem;
    }
  }
`;

const StyledTabs = styled.div`
  display: flex;
  border: 1px solid #000000;
  border-radius: 5px;
  outline: 0;
`;

const StyledTab = styled.div`
  background-color: ${({ Active }) => (Active === "active" ? "#3A95E9" : null)};
  border-radius: 4px;
  border: 0;
  color: ${({ Active }) => (Active === "active" ? "#FFFFFF" : null)};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  outline: 0;
  padding: 5px 20px;
  text-align: center;
  user-select: none;
`;

const StyledUpgrade = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
`;

const StyledUpgradeButton = styled.button`
  min-width: 35%;
  height: 2.5rem;
  background: #3a95e9;
  border: 0.5px solid #979797;
  border-radius: 7px;
  color: white;
  user-select: none;
`;

export default Subscriber;
