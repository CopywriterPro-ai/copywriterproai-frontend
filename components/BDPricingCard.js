import axios from "axios";
import Switch from "react-switch";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Spinner } from "reactstrap";

import {
  getPriceList,
  selectors as paymentSelector,
} from "@/redux/slices/payment";
import { selectors as subscriberSelector } from "@/redux/slices/subscriber";
import { useUser } from "@/hooks";
import { setRedirectPath } from "@/redux/slices/ui";
import PricingListImg from "@/assets/images/pricing/pricing-ul-li.png";
import PricingListDelImg from "@/assets/images/pricing/pricing-ul-li-del.png";
import MoneyBackImg from "@/assets/images/money-back-guarantee.png";
import pricesInfo from "@/data/price.json";

const CustomItem = ({
  mainColor = "rgb(126, 141, 196)",
  bgColor = "#f1f4ff",
  isCheckoutPending,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/contact-us");
  };

  return (
    <div className="col-md-3">
      <PriceCard className="card">
        <PriceCardHead BgColor={mainColor}>
          <PriceCardPriceWrap>
            <h4>Business</h4>
            <PriceCardPrice>
              <span className="price-amount">Custom</span>
            </PriceCardPrice>
          </PriceCardPriceWrap>
        </PriceCardHead>
        <PriceCardBody BgColor={bgColor}>
          <PriceCardItemList>
            <ul>
              <li>Unlimited words</li>
              <li>600 characters input limit</li>
              <li>50+ copywriting tools</li>
              <li>AI blog writer</li>
              <li>Multiple user login</li>
              <li>24/7 support</li>
              <li>Community support</li>
            </ul>
          </PriceCardItemList>
          <ButtonWrapper>
            <ClaimButton
              onClick={handleClick}
              BgColor={mainColor}
              disabled={isCheckoutPending}
            >
              Let&apos;s Talk
            </ClaimButton>
          </ButtonWrapper>
        </PriceCardBody>
      </PriceCard>
    </div>
  );
};

const SinglePriceItem = ({
  mainColor = "rgb(87,197,139)",
  bgColor = "#eaf8f1",
  pricedata = {},
  subscriptionInfo,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isCheckoutPending, setIsCheckoutPending] = useState(false);
  const { isAuth, userInfo } = useUser();
  const { email, firstName, lastName, userId } = userInfo;

  const {
    subscription,
    subscriberInfo: { isPaidSubscribers },
  } = subscriptionInfo;
  const priceInfo = pricesInfo[pricedata?.metadata?.priceKey];

  const handleCheckoutSessions = (priceInfo) => {
    if (!isAuth) {
      dispatch(setRedirectPath("/pricing"));
      router.push("/signin");
    }

    if (isAuth && !isCheckoutPending) {
      setIsCheckoutPending(true);
      axios
        .post("/api/payment/udp/checkout", {
          full_name: `${firstName} ${lastName}`,
          email: email || "unknown@email.com",
          amount: priceInfo?.price?.bdt,
          metadata: {
            user_id: userId,
            price_key: priceInfo?.key,
          },
        })
        .then((res) => {
          const { payment_url, status } = res.data;
          if (window && status === true) {
            window.location.href = payment_url;
          }
        })
        .catch((err) => {
          setIsCheckoutPending(false);
          console.warn(err);
        });
    }
  };

  return (
    <div className="col-md-3">
      <PriceCard className="card">
        <PriceCardHead BgColor={mainColor}>
          <PriceCardPriceWrap>
            <h4>{pricedata.product?.name}</h4>
            <PriceCardPrice>
              <span className="price-symbol">৳</span>
              <span className="price-amount">
                {priceInfo?.price?.bdt || 0}{" "}
                <span className="price-duration">
                  /{pricedata.recurring.interval_count} month
                </span>
              </span>
            </PriceCardPrice>
          </PriceCardPriceWrap>
        </PriceCardHead>
        <PriceCardBody BgColor={bgColor}>
          <PriceCardItemList>
            <ul>
              <PriceCardItemListItem>
                {priceInfo?.words} words/{priceInfo?.period}
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                {priceInfo?.maxInput} characters input limit
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                {priceInfo?.totalTools} copywriting tools
              </PriceCardItemListItem>
              <PriceCardItemListItem
                Disabled={priceInfo?.hasAiBlog ? "false" : "true"}
              >
                AI blog writer
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                {priceInfo?.user} user login
              </PriceCardItemListItem>
              <PriceCardItemListItem>24/7 support</PriceCardItemListItem>
              <PriceCardItemListItem>Community support</PriceCardItemListItem>
            </ul>
          </PriceCardItemList>
          <ButtonWrapper>
            <ClaimButton
              BgColor={mainColor}
              onClick={() => handleCheckoutSessions(priceInfo)}
              disabled={isCheckoutPending}
            >
              {isAuth &&
                (pricedata.metadata.priceKey === subscription
                  ? isPaidSubscribers
                    ? "Active"
                    : "Expired"
                  : "Get Started")}
              {!isAuth && "Start 7 days free trail"}
            </ClaimButton>
          </ButtonWrapper>
        </PriceCardBody>
      </PriceCard>
    </div>
  );
};

const PricingCard = () => {
  const dispatch = useDispatch();
  const [isOneMonth, setIsOneMonth] = useState(false);
  //Crazy Reverse Logic
  const interval = isOneMonth ? 6 : 1;

  const { items, loading } = useSelector(
    paymentSelector.getPriceList(interval)
  );
  const { isAuth } = useUser();
  const { loading: checkoutLoading } = useSelector(paymentSelector.getCheckout);
  const { data: subscriptionInfo } = useSelector(
    subscriberSelector.getOwnSubscriber
  );
  const isCheckoutPending = checkoutLoading === "pending";

  const handlePriceChange = () => {
    setIsOneMonth(!isOneMonth);
  };

  useEffect(() => {
    dispatch(getPriceList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setRedirectPath(null));
  }, [dispatch]);

  if (loading === "pending" && !items.length) {
    return (
      <StyledLoading>
        <Spinner />
      </StyledLoading>
    );
  }

  return (
    <PriceSection>
      <SectionTitle>Grow Your Business With CopywriterPro</SectionTitle>
      <PriceSwitch>
        <span>One Month</span>
        <PriceSwitchButton
          checked={isOneMonth}
          onChange={handlePriceChange}
          onColor="#17A896"
          offColor="#17A896"
          uncheckedIcon={false}
          checkedIcon={false}
          handleDiameter={28}
          height={38}
          width={75}
        />
        <span>Six Month</span>
      </PriceSwitch>
      <div className="row justify-content-center" style={{ marginTop: "20px" }}>
        {items &&
          items.map((item, index) => (
            <SinglePriceItem
              mainColor={item?.metadata?.mainColor}
              bgColor={item?.metadata?.bodyColor}
              key={index}
              pricedata={item}
              isCheckoutPending={isCheckoutPending}
              subscriptionInfo={subscriptionInfo}
            />
          ))}
        <CustomItem isCheckoutPending={isCheckoutPending} />
      </div>

      <MoneyBackContainer>
        <MoneyBack>
          <MoneyBackImgIcon src={MoneyBackImg.src} alt="money back guarantee" />
          <MoneyBackDisc>
            <h4>7-day Money Back Guarantee</h4>
            <p>
              It&apos;s always hard to say goodbye. But we value our
              customer&apos;s opinions.
              <br />
              If you want to cancel your subscription just send us an email at
              support@copywriterpro.ai within 7 days of purchase for a full
              refund.
            </p>
          </MoneyBackDisc>
        </MoneyBack>
      </MoneyBackContainer>
    </PriceSection>
  );
};

const StyledLoading = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  line-height: 45px;
`;

const PriceSection = styled.div``;

const PriceSwitch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
  margin-bottom: 48px;

  span {
    font-size: 28px;
    font-weight: 500;
  }
`;

const PriceSwitchButton = styled(Switch)`
  border: 1px solid black;
  margin: 0 10px;
`;

const MoneyBackContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const MoneyBack = styled.div`
  max-width: 70%;
  display: flex;
  align-items: center;
`;

const MoneyBackImgIcon = styled.img`
  width: 150px;
`;

const MoneyBackDisc = styled.div`
  margin-left: 2.5rem;

  h4 {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 0.8rem;
  }
  p {
    font-size: 14px;
    line-height: 22px;
  }
`;

const PriceCard = styled.div`
  overflow: hidden;
  border-radius: 0.5rem;
  margin-bottom: 30px;
`;

const PriceCardHead = styled.div`
  background: ${({ BgColor }) => (BgColor ? BgColor : "rgb(87,197,139)")};
  color: white;
  min-height: 145px;

  h4 {
    font-size: 24px;
    font-weight: 500;
    line-height: 42px;
  }
`;

const PriceCardPriceWrap = styled.div`
  padding: 12px 20px;
`;

const PriceCardPrice = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  height: 65px;

  .price-symbol {
    font-size: 25px;
    align-self: flex-start;
  }
  .price-amount {
    font-size: 35px;
  }
  .price-duration {
    font-size: 20px;
  }
`;

const PriceCardBody = styled.div`
  background: ${({ BgColor }) => (BgColor ? BgColor : "#eaf8f1")};
  border: 1.5px solid ${({ BgColor }) => (BgColor ? BgColor : "#eaf8f1")};
`;

const ButtonWrapper = styled.div`
  padding: 0 15px;
`;

const ClaimButton = styled.button`
  background: ${({ BgColor }) => (BgColor ? BgColor : "rgb(87,197,139)")};
  border-radius: 4px;
  border: 1px solid #000000;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  color: white;
  display: block;
  font-size: 18px;
  margin-bottom: 13px;
  padding: 3px;
  width: 100%;
  font-size: 15px;

  &:disabled {
    opacity: 0.7;
  }
`;

const PriceCardItemList = styled.div`
  ul {
    padding-top: 15px;
    padding-bottom: 5px;

    li {
      list-style: url(${PricingListImg.src});
      padding: 8px 0;
    }
  }
`;

const PriceCardItemListItem = styled.li`
  list-style: ${({ Disabled }) =>
    Disabled === "true"
      ? `url(${PricingListDelImg.src})`
      : `url(${PricingListImg.src})`}!important;

  color: ${({ Disabled }) =>
    Disabled === "true" ? `#afafaf` : `inherit`}!important;
`;

export default PricingCard;
