/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styled from "styled-components";

import PriceSlider from "./common/PriceSlider";
import PriceCard from "./PriceCard";
import MoneyBackIcon from "@/assets/images/money-back-guarantee-2.png";

const MOBILE_SCREEN_MAX = 764;

const PricingCard = () => {
  const [months, setMonths] = useState(1);

  return (
    <div>
      <PricingHead>
        <h2>
          Make your writing <span>smarter</span> and <span>faster</span>
        </h2>
        <strong>
          Get <span>+5% discount</span> with 6 months of extra subscription
        </strong>
      </PricingHead>
      <div style={{ maxWidth: "80%", margin: "0 auto" }}>
        <PriceSlider months={months} setMonths={setMonths} />
      </div>
      <PriceCard months={months} />
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
    </div>
  );
};

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

  @media (max-width: ${MOBILE_SCREEN_MAX}px) {
    margin-top: 5rem;
    margin-bottom: 2rem;
    text-align: left;

    h2 {
      font-size: 45px;
    }

    strong {
      font-size: 24px;
    }
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

  @media (max-width: ${MOBILE_SCREEN_MAX}px) {
    text-align: center;

    img {
      width: 60px;
    }
    h3 {
      margin: 1.5rem auto;
      font-weight: 700;
      font-size: 20px;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      width: 80%;
    }
  }
`;

export default PricingCard;
