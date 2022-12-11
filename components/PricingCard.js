import Switch from "react-switch";
import Link from "next/link";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Spinner from "./common/Spinner";

import {
  getPriceList,
  postCreateCustomer,
  postCreateCheckoutSession,
  selectors as paymentSelector,
} from "@/redux/slices/payment";
import { selectors as authSelector } from "@/redux/slices/auth";
import { selectors as subscriberSelector } from "@/redux/slices/subscriber";
import { setRedirectPath } from "@/redux/slices/ui";
import { stripe as getStripe } from "@/utils";
import PricingListImg from "@/assets/images/pricing/pricing-ul-li.png";
import PricingListDelImg from "@/assets/images/pricing/pricing-ul-li-del.png";
import MoneyBackImg from "@/assets/images/money-back-guarantee.png";
import pricesInfo from "@/data/price.json";
import * as mixUtils from "@/utils/mixUtils";

const timezone = mixUtils.getTimezone();
const isBD = timezone === "Asia/Dhaka";

const TrialItem = ({
  mainColor = "rgb(87,197,139)",
  bgColor = "#eaf8f1",
  isCheckoutPending,
  isAuth,
  subscriptionInfo,
}) => {
  const router = useRouter();

  const { freeTrial } = subscriptionInfo;

  const handleClick = () => {
    if (!isAuth) {
      router.push("/signin");
    }
  };

  return (
    <div className="col-md-3">
      <PriceCard className="card">
        <PriceCardHead BgColor={mainColor}>
          <PriceCardPriceWrap>
            <h4>Trial</h4>
            <PriceCardPrice>
              <span className="price-symbol">$</span>
              <span className="price-amount">0</span>
            </PriceCardPrice>
          </PriceCardPriceWrap>
        </PriceCardHead>
        <PriceCardBody BgColor={bgColor}>
          <PriceCardItemList>
            <ul>
              <li>10,000 words</li>
              <li>400 characters input limit</li>
              <li>600 characters output limit</li>
              <li>45+ copywriting tools</li>
              <li>AI blog writer</li>
              <li>1 user login</li>
              <li>24/7 support</li>
              <li>Community support</li>
            </ul>
          </PriceCardItemList>
          <ButtonWrapper>
            <ClaimButton
              onClick={handleClick}
              BgColor={mainColor}
              disabled={isCheckoutPending || (isAuth && !freeTrial?.eligible)}
            >
              {!isAuth
                ? "Start 7-day Free Trial"
                : freeTrial?.eligible
                ? "Active"
                : "Free Trial"}
            </ClaimButton>
          </ButtonWrapper>
        </PriceCardBody>
      </PriceCard>
    </div>
  );
};

const CustomItem = ({
  mainColor = "#7E8DC3",
  bgColor = "radial-gradient(56.49% 107.15% at 53.27% 31.8%, rgba(168, 184, 240, 0.285) 0%, rgba(132, 151, 218, 0) 100%)",
  isCheckoutPending,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/contact-us");
  };

  return (
    <CustomPrice className="col-md-3">
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
              <PriceCardItemListItem>
                <img src={PricingListImg.src} alt="available"/>
                <p>Unlimited words</p>
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                <img src={PricingListImg.src} alt="available"/>
                <p>No input limit</p>
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                <img src={PricingListImg.src} alt="available"/>
                <p>50+ copywriting tools</p>
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                <img src={PricingListImg.src} alt="available"/>
                <p>AI blog writer</p>
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                <img src={PricingListImg.src} alt="available"/>
                <p>Plagiarism Checker</p>
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                <img src={PricingListImg.src} alt="available"/>
                <p>No user limit</p>
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                <img src={PricingListImg.src} alt="available"/>
                <p>24/7 support</p>
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                <img src={PricingListImg.src} alt="available"/>
                <p>Community support</p>
              </PriceCardItemListItem>
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
    </CustomPrice>
  );
};

const SinglePriceItem = ({
  mainColor = "rgb(87,197,139)",
  bgColor = "#eaf8f1",
  isCheckoutPending,
  pricedata = {},
  subscriptionInfo,
  isAuth,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    subscription,
    subscriberInfo: { isPaidSubscribers },
  } = subscriptionInfo;
  const priceInfo = pricesInfo[pricedata?.metadata?.priceKey];

  const handleCheckoutSessions = (priceId) => {
    if (!isAuth) {
      dispatch(setRedirectPath("/pricing"));
      router.push("/signin");
    }

    if (isAuth && !isCheckoutPending)
      dispatch(postCreateCheckoutSession({ data: { priceId } })).then(
        async ({ payload }) => {
          if (payload.status === 200) {
            const { data } = payload;
            const stripe = await getStripe();
            stripe?.redirectToCheckout({
              sessionId: data.session.id,
            });
          }
        }
      );
  };

  return (
    <SinglePrice className="col-md-3">
      <PriceCard className="card">
        <PriceCardHead BgColor={mainColor}>
          <PriceCardPriceWrap>
            <h4>{pricedata.product?.name}</h4>
            <PriceCardPrice>
              <span className="price-symbol">$</span>
              <span className="price-amount">
                {pricedata.unit_amount / 100}{" "}
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
                <img src={PricingListImg.src} alt="available"/>
                <p>{priceInfo?.words} words/month</p>
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                <img src={PricingListImg.src} alt="available"/>
                <p>{priceInfo?.maxInput} characters input limit</p>
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                <img src={PricingListImg.src} alt="available"/>
                <p>{priceInfo?.totalTools} copywriting tools</p>
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                <img src={priceInfo?.hasAiBlog ? PricingListImg.src : PricingListDelImg.src} alt="unavailable"/>
                <p>AI blog writer</p>
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                <img src={priceInfo?.hasPlagiarism ? PricingListImg.src : PricingListDelImg.src} alt="unavailable"/>
                <p>Plagiarism Checker</p>
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                <img src={PricingListImg.src} alt="available"/>
                <p>{priceInfo?.user} user login</p>
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                <img src={PricingListImg.src} alt="available"/>
                <p>24/7 support</p>
              </PriceCardItemListItem>
              <PriceCardItemListItem>
                <img src={PricingListImg.src} alt="available"/>
                <p>Community support</p>
              </PriceCardItemListItem>
            </ul>
          </PriceCardItemList>
          <ButtonWrapper>
            <ClaimButton
              BgColor={mainColor}
              onClick={() => handleCheckoutSessions(pricedata.id)}
              disabled={isCheckoutPending}
            >
              {isAuth &&
                (pricedata.metadata.priceKey === subscription
                  ? isPaidSubscribers
                    ? "Active"
                    : "Expired"
                  : "Get Started")}
              {!isAuth && "Start 7-day free trial"}
            </ClaimButton>
          </ButtonWrapper>
        </PriceCardBody>
      </PriceCard>
    </SinglePrice>
  );
};

const SinglePrice = styled.div`
  flex: 0 0 25%;
  max-width: 25%;
  padding: 0 9px 0 9px;

  @media (max-width: 1250px) {
    flex: 1 0 50%;
    max-width: 50%;
  }

  @media (max-width: 576px) {
    flex: 1 0 90%;
    max-width: 90%;
  }
`;

const CustomPrice = styled.div`
  flex: 0 0 25%;
  max-width: 25%;
  padding: 0 9px 0 9px;

  @media (max-width: 1250px) {
    flex: 1 0 50%;
    max-width: 50%;
  }

  @media (max-width: 576px) {
    flex: 1 0 90%;
    max-width: 90%;
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
  margin-bottom: 20px;
`;

const ClaimButton = styled.button`
  background: ${({ BgColor }) => (BgColor ? BgColor : "rgb(87,197,139)")};
  border-radius: 4px;
  border: 1px solid #000000;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  color: white;
  display: block;
  font-size: 20px;
  margin-bottom: 13px;
  padding: 7px;
  width: 100%;
  font-size: 15px;

  &:disabled {
    opacity: 0.7;
  }
`;

const PriceCardItemList = styled.div`
  ul {
    padding: 15px 16px 5px 16px;
  }
`;

// const PriceCardItemListItem = styled.li`
//   list-style: ${({ Disabled }) =>
//     Disabled === "true"
//       ? `url(${PricingListDelImg.src})`
//       : `url(${PricingListImg.src})`}!important;
// `;

const PriceCardItemListItem = styled.li`
  list-style: none;
  padding: 8px 0;
  margin: 15px 0;
  display: flex;
  align-items: center;

  img {
    height: 10px;
    margin-right: 10px;
    margin-bottom: 2px;
  }

  p {
    margin-bottom: 0;

    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
`;

const PricingCard = () => {
  const dispatch = useDispatch();

  const [isOneMonth, setIsOneMonth] = useState(false);

  //Crazy Reverse Logic
  const interval = isOneMonth ? 6 : 1;

  const { items, loading } = useSelector(
    paymentSelector.getPriceList(interval)
  );
  const { id: customerId } = useSelector(paymentSelector.getCustomer);
  const { isAuth } = useSelector(authSelector.getAuthenticate);
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

  useEffect(() => {
    if (isAuth && !customerId) {
      dispatch(postCreateCustomer());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isAuth]);

  if (loading === "pending" && !items.length) {
    return (
      <StyledLoading>
        <Spinner />
      </StyledLoading>
    );
  }

  return (
    <PriceSection>
      <SectionTitle>Make your writing smarter and faster</SectionTitle>
      {/* {isBD && (
        <StyledMobileBanking>
          To make a payment with Bkash, Rocket or Upay, please visit  <Link href="/bd-pricing">this page.</Link>
        </StyledMobileBanking>
      )} */}
      <PriceSwitch>
        <span>Monthly</span>
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
        <span>Semi-Annual</span>
        <PriceDiscount>Save 30%</PriceDiscount>
      </PriceSwitch>
      <div className="row justify-content-center" style={{ marginTop: "20px" }}>
        {/* <TrialItem
          isCheckoutPending={isCheckoutPending}
          subscriptionInfo={subscriptionInfo}
          isAuth={isAuth}
        /> */}
        {items &&
          items.map((item, index) => (
            <SinglePriceItem
              mainColor={item?.metadata?.mainColor}
              bgColor={item?.metadata?.bodyColor}
              key={index}
              pricedata={item}
              isCheckoutPending={isCheckoutPending}
              subscriptionInfo={subscriptionInfo}
              isAuth={isAuth}
            />
          ))}
        <CustomItem isCheckoutPending={isCheckoutPending} />
      </div>

      <MoneyBackContainer>
        <MoneyBack>
          <MoneyBackImgIcon src={MoneyBackImg.src} alt="money back guarantee" />
          <MoneyBackDisc>
            <h4>3-day Money Back Guarantee</h4>
            <p>
              It&apos;s always hard to say goodbye. But we value our
              customer&apos;s opinions.
              <br />
              To cancel your subscription just send us an email at <b>support@copywriterpro.ai</b> within 3 days of purchase for a full refund.
            </p>
          </MoneyBackDisc>
        </MoneyBack>
      </MoneyBackContainer>
    </PriceSection>
  );
};

const StyledMobileBanking = styled.div`
  text-align: center;
  margin: 28px 30px 0 30px;
  font-weight: 500;
  a {
  }

  @media (max-width: 576px) {
    margin: 28px 10px 0 10px;
  }

  @media (max-width: 375px) {
    font-size: 14px;
  }
`;

const StyledLoading = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 45px;
  font-weight: 800;
  line-height: 45px;

  @media (max-width: 992px) {
    line-height: 60px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
    line-height: 50px;
  }

  @media (max-width: 576px) {
    font-size: 37px;
    line-height: 55px;
  }

  @media (max-width: 425px) {
    font-size: 34px;
    line-height: 50px;
  }

  @media (max-width: 375px) {
    font-size: 29.5px;
    line-height: 45px;
  }
`;

const PriceSection = styled.div``;

const PriceSwitch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 65px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    margin-top: 45px;
  }

  span {
    font-size: 26px;
    font-weight: bold;

    @media (max-width: 768px) {
      font-size: 18px;
    }

    @media (max-width: 576px) {
      font-size: 15px;
    }

    @media (max-width: 425px) {
      font-size: 13px;
    }

    @media (max-width: 370px) {
      font-size: 15px;
    }
  }
`;

const PriceSwitchButton = styled(Switch)`
  margin: 0 25px;

  @media (max-width: 576px) {
    margin: 0 16px;
  }

  @media (max-width: 425px) {
    margin: 0 11px;
  }

  .react-switch-bg {
    border: 1.5px solid black;

    @media (max-width: 576px) {
      height: 29px !important;
      width: 65px !important;
    }
  }

  .react-switch-handle {
    @media (max-width: 576px) {
      height: 18px !important;
      width: 18px !important;
    }

    @media (max-width: 375px) {
      height: 19px !important;
      width: 19px !important;
    }
  }
`;

const PriceDiscount = styled.p`
  background: #17a896;
  margin: 0 0 0 20px;
  color: white;
  font-weight: 500;
  padding: 5px 20px;
  border-radius: 30px;

  @media (max-width: 768px) {
    margin-left: 15px;
    font-size: 11px;
  }

  @media (max-width: 500px) {
    padding: 5px 12px;
  }

  @media (max-width: 425px) {
    margin-left: 9px;
    font-size: 10px;
    padding: 4px 13px;
  }

  @media (max-width: 370px) {
    display: none;
  }
`;

const MoneyBackContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 7rem 0;

  @media (max-width: 375px) {
    margin: 6rem 0;
  }
`;

const MoneyBack = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MoneyBackImgIcon = styled.img`
  width: 100px;
  margin-bottom: 2rem;

  @media (max-width: 992px) {
    width: 80px;
  }

  @media (max-width: 768px) {
    width: 65px;
  }

  @media (max-width: 576px) {
    width: 70px;
  }
`;

const MoneyBackDisc = styled.div`
  h4 {
    font-weight: 700;
    font-size: 35px;
    margin-bottom: 1.2rem;
    text-align: center;

    @media (max-width: 992px) {
      font-size: 28px;
    }

    @media (max-width: 768px) {
      font-size: 25px;
    }

    @media (max-width: 576px) {
      font-size: 21px;
    }

    @media (max-width: 375px) {
      font-size: 17px;
    }
  }
  p {
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 0;
    text-align: center;
    width: 50rem;

    @media (max-width: 992px) {
      font-size: 16px;
      line-height: 30px;
      width: 40rem;
    }

    @media (max-width: 768px) {
      font-size: 14px;
      line-height: 29px;
      width: 31rem;
    }

    @media (max-width: 576px) {
      font-size: 14px;
      line-height: 25px;
      width: 20rem;
    }

    @media (max-width: 375px) {
      font-size: 13px;
      line-height: 24px;
      width: 17rem;
    }
  }
`;

export default PricingCard;
