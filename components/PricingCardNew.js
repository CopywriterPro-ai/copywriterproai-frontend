/* eslint-disable @next/next/no-img-element */
import { useState, useMemo } from "react";
import styled from "styled-components";
import numeral from "numeral";

import PriceSlider from "./common/PriceSlider";
import MoneyBackIcon from "@/assets/images/money-back-guarantee-2.png";

const packages = [
  { name: "Light", price: 5, popular: false, features: { words: 5000 } },
  { name: "Basic", price: 35, popular: false, features: { words: 12000 } },
  {
    name: "Professional",
    price: 99,
    popular: true,
    features: { words: 500000 },
  },
  {
    name: "Enterprise",
    price: "Custom",
    popular: false,
    features: { words: "Custom" },
  },
];

const Tick = ({ size = "16" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8L8 14L18 2"
        stroke="#007FFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Cross = ({ size = "14" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 16L2 2M16 2L2 16"
        stroke="#EE3434"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

const PricingCard = () => {
  const [months, setMonths] = useState(10);

  const calculateprice = useMemo(() => {
    return packages.map((item) => {
      if (item.name === "Enterprise") {
        return item;
      } else {
        let percentage = 0;
        switch (true) {
          case months === 24:
            percentage = 20;
            break;
          case months >= 18:
            percentage = 15;
            break;
          case months >= 12:
            percentage = 10;
            break;
          case months >= 6:
            percentage = 5;
            break;
          default:
            percentage = 0;
            break;
        }
        let productprice = item.price * months;
        let words = item.features.words * months;
        let formatedWords = numeral(words).format("0,0");
        let floatnum = percentage / 100;
        let percentageamount = productprice - productprice * floatnum;
        let price = parseFloat(percentageamount).toFixed(2);

        return {
          ...item,
          price,
          features: { ...item.features, words: formatedWords },
        };
      }
    });
  }, [months]);

  return (
    <PriceSection>
      <PricingHead>
        <h2>
          Make your writing <span>smarter</span> and <span>faster</span>
        </h2>
        <strong>
          Get <span>+5% discount</span> with extra 6 months of subscription
        </strong>
      </PricingHead>
      <PriceSlider months={months} setMonths={setMonths} />
      <PriceContainer>
        <SinglePriceCard>
          <SinglePriceCardHead></SinglePriceCardHead>
          <SinglePriceCardBody>
            <PriceFeatureList>
              <li>Word Limit</li>
              <li>Input limit</li>
              <li>User Limit</li>
              <li>Copywriting tools</li>
              <li>AI blog generator</li>
              <li>Chrome extension</li>
              <li>Firefox Addon</li>
              <li>Community support</li>
              <li>24/7 support</li>
            </PriceFeatureList>
          </SinglePriceCardBody>
          <SinglePriceCardFooter>
            <button>Start 7-day free trial</button>
          </SinglePriceCardFooter>
        </SinglePriceCard>

        {calculateprice.map((plan) => (
          <SinglePriceCard key={plan.name} IsPopular={plan.popular}>
            <SinglePriceCardHead>
              <strong>{plan.name}</strong>
              <h4>
                {plan.name === "Enterprise" ? "" : "$"}
                {plan.price}
              </h4>
            </SinglePriceCardHead>
            <SinglePriceCardBody>
              <PriceFeatureList>
                <li>{plan.features.words} words</li>
                <li>400 character</li>
                <li>1 user </li>
                <li>45+ templates</li>
                <li>
                  <Tick size="16" />
                </li>
                <li>
                  <Tick size="16" />
                </li>
                <li>
                  <Cross size="14" />
                </li>
                <li>
                  <Tick size="16" />
                </li>
                <li>
                  <Cross size="14" />
                </li>
              </PriceFeatureList>
            </SinglePriceCardBody>
            <SinglePriceCardFooter IsPopular={plan.popular}>
              <button>Select Plan</button>
            </SinglePriceCardFooter>
          </SinglePriceCard>
        ))}
      </PriceContainer>
      <StyledMoneyBack>
        <StyledMoneyBackWrapper>
          <img src={MoneyBackIcon.src} alt="Money Back Guarantee" />
          <h3>7-day Money Back Guarantee</h3>
          <p>
            It&apos;s always hard to say goodbye. But we value our
            customer&apos;s opinions.
            <br /> To cancel your subscription just send us an email at
            support@copywriterpro.ai
            <br /> within 7 days of purchase for a full refund.
          </p>
        </StyledMoneyBackWrapper>
      </StyledMoneyBack>
    </PriceSection>
  );
};

const PriceFeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 14px 0;
    font-size: 16px;
    min-width: 180px;
    line-height: 26px;
  }
`;

const PriceSection = styled.div``;

const PricingHead = styled.div`
  text-align: center;
  margin-top: 8rem;
  margin-bottom: 5rem;

  h2 {
    font-weight: 800;
    margin-bottom: 2rem;
    font-size: 40px;
  }
  strong {
    font-weight: 600;
    font-size: 22px;
  }
  span {
    color: #007fff;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  column-gap: 4rem;
`;

const SinglePriceCard = styled.div`
  padding: 30px 25px 5px;
  border-radius: 15px;

  ${({ IsPopular }) => {
    if (IsPopular)
      return `box-shadow: 1px 1px 10px 1px rgba(0, 127, 255, 0.2);
`;
  }}
`;

const SinglePriceCardHead = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100px;

  strong {
    font-size: 16px;
    font-weight: 700;
  }

  h4 {
    color: #003e77;
    font-size: 28px;
    font-weight: 700;
  }
`;

const SinglePriceCardBody = styled.div``;

const SinglePriceCardFooter = styled.div`
  min-height: 50px;
  margin-top: 15px;
  button {
    width: 100%;
    color: ${({ IsPopular }) => (IsPopular ? "#fff" : "#007fff")};
    background-color: ${({ IsPopular }) => (IsPopular ? "#007fff" : "#fff")};
    border: 1.8px solid #007fff;
    border-radius: 4px;
    outline: none;
    font-size: 14px;
  }
`;

const StyledMoneyBack = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background: radial-gradient(50% 50% at 50% 50%, #013464 0%, #03294d 100%);
  margin-top: 5rem;
  margin-bottom: 10rem;
`;

const StyledMoneyBackWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 420px;
  color: #fff;

  img {
    width: 100px;
  }
  h3 {
    margin-top: 1rem;
    font-weight: 700;
    font-size: 32px;
  }
  p {
    margin-top: 1rem;
    font-weight: 500;
    text-align: center;
  }
`;

export default PricingCard;
