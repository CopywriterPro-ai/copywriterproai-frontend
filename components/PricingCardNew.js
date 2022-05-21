import { useState } from "react";
import styled from "styled-components";

import PriceSlider from "./common/PriceSlider";

const packages = [
  { name: "Light", price: "$5", popular: false },
  { name: "Basic", price: "$35", popular: false },
  { name: "Professional", price: "$99", popular: true },
  { name: "Enterprise", price: "Custom", popular: false },
];

const PricingCard = () => {
  const [months, setMonths] = useState(10);

  return (
    <PriceSection>
      <SectionTitle>Make your writing smarter and faster</SectionTitle>
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

        {packages.map((plan) => (
          <SinglePriceCard key={plan.name} IsPopular={plan.popular}>
            <SinglePriceCardHead>
              <strong>{plan.name}</strong>
              <h4>{plan.price}</h4>
            </SinglePriceCardHead>
            <SinglePriceCardBody>
              <PriceFeatureList>
                <li>10,000 words</li>
                <li>400 character</li>
                <li>1 user </li>
                <li>45+ templates</li>
                <li>no</li>
                <li>yes</li>
                <li>yes</li>
                <li>yes</li>
                <li>no</li>
              </PriceFeatureList>
            </SinglePriceCardBody>
            <SinglePriceCardFooter IsPopular={plan.popular}>
              <button>Select Plan</button>
            </SinglePriceCardFooter>
          </SinglePriceCard>
        ))}
      </PriceContainer>
    </PriceSection>
  );
};

const PriceFeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 10px 0;
    font-size: 14px;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  line-height: 45px;
`;

const PriceSection = styled.div``;

const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

export default PricingCard;
