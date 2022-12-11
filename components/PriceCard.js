import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { usePackages, useWindowSize } from "@/hooks";
import { selectors as uiSelector } from "@/redux/slices/ui";

const MOBILE_SCREEN_MAX = 960;
const LAPTOP_SCREEN_MAX = 1150;
// const LARGE_SCREEN_MIN = 1200;

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

const YesOrNo = ({ bool = false }) => {
  return bool ? <Tick /> : <Cross />;
};

const PriceCard = ({ months }) => {
  const { pricingFeaturesName, pricingPackages } = usePackages(months);
  const { width: windowWidth } = useWindowSize();
  const pricingTab = useRef(null);
  const [smallScreenActivePackage, setSmallScreenActivePackage] =
    useState("Light");

  const { noticeHeight, navHeight, showNoticeBar } = useSelector(
    uiSelector.getHeaderElementSize
  );

  const headerSize = showNoticeBar ? noticeHeight + navHeight : navHeight;

  const screenSize = useMemo(() => {
    const isSmall = MOBILE_SCREEN_MAX > windowWidth;
    const isMedium =
      MOBILE_SCREEN_MAX < windowWidth && windowWidth < LAPTOP_SCREEN_MAX;

    return {
      isSmall,
      isMedium,
    };
  }, [windowWidth]);

  const dynamicPricing = useMemo(() => {
    let pricingArr = pricingPackages;
    if (!screenSize.isSmall) {
      pricingArr = [{ isHeader: true }, ...pricingArr];
    }

    if (screenSize.isSmall) {
      pricingArr = pricingArr.filter(
        (price) => price.name === smallScreenActivePackage
      );
    }

    if (screenSize.isMedium) {
      pricingArr.splice(3, 0, { isHeader: true });
      return pricingArr;
    } else {
      return pricingArr;
    }
  }, [
    pricingPackages,
    screenSize.isMedium,
    screenSize.isSmall,
    smallScreenActivePackage,
  ]);

  return (
    <>
      {screenSize.isSmall && (
        <PricingTab headerSize={headerSize} ref={pricingTab}>
          {pricingPackages.map((price) => (
            <PricingTabItem
              isActivePackage={price.name === smallScreenActivePackage}
              onClick={() => setSmallScreenActivePackage(price.name)}
              key={price.name}
            >
              {price.name}
            </PricingTabItem>
          ))}
        </PricingTab>
      )}

      <PriceContainer>
        {dynamicPricing.map((plan, index) => {
          if (plan.isHeader) {
            return (
              <SinglePriceCard key={index}>
                <SinglePriceCardHead></SinglePriceCardHead>
                <PriceFeatureList>
                  <li>{pricingFeaturesName.words}</li>
                  <li>{pricingFeaturesName.inputLimit}</li>
                  <li>{pricingFeaturesName.userLimit}</li>
                  <li>{pricingFeaturesName.copywritingTools}</li>
                  <li>{pricingFeaturesName.aiBlogGenerator}</li>
                  <li>{pricingFeaturesName.grammerFixer}</li>
                  <li>{pricingFeaturesName.readabilityEnhancer}</li>
                  <li>{pricingFeaturesName.proofReading}</li>
                  <li>{pricingFeaturesName.plagiarismChecker}</li>
                  <li>{pricingFeaturesName.keywordResearch}</li>
                  <li>{pricingFeaturesName.chromeExtension}</li>
                  <li>{pricingFeaturesName.fireFoxAddon}</li>
                  <li>{pricingFeaturesName.communitySupport}</li>
                  <li>{pricingFeaturesName.tweentyFourSevenSupport}</li>
                </PriceFeatureList>
                <SinglePriceCardFooter>
                  <button>Start 7-day free trial</button>
                </SinglePriceCardFooter>
              </SinglePriceCard>
            );
          }

          const { name, popular, price, features } = plan;
          return (
            <SinglePriceCard key={name} IsPopular={popular}>
              <SinglePriceCardHead>
                <strong>{name}</strong>
                <h4>
                  {name === "Enterprise" ? "" : "$"}
                  {price}
                </h4>
              </SinglePriceCardHead>
              <PriceFeatureList>
                <li>
                  <span>{pricingFeaturesName.words}</span>
                  <span style={{ fontWeight: 600 }}>
                    {features.words} words
                  </span>
                </li>
                <li>
                  <span>{pricingFeaturesName.inputLimit}</span>
                  <span>{features.inputLimit} character</span>
                </li>
                <li>
                  <span>{pricingFeaturesName.userLimit}</span>
                  <span>{features.userLimit} user</span>
                </li>
                <li>
                  <span>{pricingFeaturesName.copywritingTools}</span>
                  <span>{features.copywritingTools}+ templates</span>
                </li>
                <li>
                  <span>{pricingFeaturesName.aiBlogGenerator}</span>
                  <YesOrNo bool={features.aiBlogGenerator} />
                </li>
                <li>
                  <span>{pricingFeaturesName.grammerFixer}</span>
                  <YesOrNo bool={features.grammerFixer} />
                </li>
                <li>
                  <span>{pricingFeaturesName.readabilityEnhancer}</span>
                  <YesOrNo bool={features.readabilityEnhancer} />
                </li>
                <li>
                  <span>{pricingFeaturesName.proofReading}</span>
                  <YesOrNo bool={features.proofReading} />
                </li>
                <li>
                  <span>{pricingFeaturesName.plagiarismChecker}</span>
                  <YesOrNo bool={features.plagiarismChecker} />
                </li>
                <li>
                  <span>{pricingFeaturesName.keywordResearch}</span>
                  <YesOrNo bool={features.keywordResearch} />
                </li>
                <li>
                  <span>{pricingFeaturesName.chromeExtension}</span>
                  <YesOrNo bool={features.chromeExtension} />
                </li>
                <li>
                  <span>{pricingFeaturesName.fireFoxAddon}</span>
                  <YesOrNo bool={features.fireFoxAddon} />
                </li>
                <li>
                  <span>{pricingFeaturesName.communitySupport}</span>
                  <YesOrNo bool={features.communitySupport} />
                </li>
                <li>
                  <span>{pricingFeaturesName.tweentyFourSevenSupport}</span>
                  <YesOrNo bool={features.tweentyFourSevenSupport} />
                </li>
              </PriceFeatureList>
              <SinglePriceCardFooter IsPopular={plan.popular}>
                <button>Select Plan</button>
              </SinglePriceCardFooter>
            </SinglePriceCard>
          );
        })}
      </PriceContainer>
    </>
  );
};

const PriceContainer = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 1rem;
  row-gap: 2rem;
`;

const SinglePriceCard = styled.div`
  padding: 30px 20px;
  border-radius: 15px;
  flex: 1 0 auto;

  ${({ IsPopular }) => {
    if (IsPopular)
      return `box-shadow: 1px 1px 10px 1px rgba(0, 127, 255, 0.2);`;
  }}

  @media (max-width: ${LAPTOP_SCREEN_MAX}px) {
    flex: 1 0 30%;
  }

  @media (max-width: ${MOBILE_SCREEN_MAX}px) {
    flex: 1 0 100%;
  }
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

  @media (max-width: ${MOBILE_SCREEN_MAX}px) {
    min-height: 90px;
    align-items: center;
    margin-bottom: 1rem;

    strong {
      font-size: 30px;
      margin-bottom: 2rem;
    }

    h4 {
      font-size: 45px;
    }
  }
`;

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

const PriceFeatureList = styled.ul`
  font-size: 14px;
  list-style: none;
  padding: 0;

  li {
    padding: 14px 5px;
    line-height: 26px;

    span {
      &:first-child {
        display: none;
      }
    }
  }

  @media (max-width: ${MOBILE_SCREEN_MAX}px) {
    li {
      display: flex;
      width: 100%;
      justify-content: space-between;
      span {
        &:first-child {
          display: block;
        }
      }
    }
  }
`;

const PricingTab = styled.div`
  background-color: #01315d;
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  margin-left: -1rem;
  margin-right: -1rem;
  position: sticky;
  top: ${({ headerSize }) => `${headerSize}px`};
  z-index: 9999;
`;

const PricingTabItem = styled.div`
  text-align: center;
  width: 100%;
  font-size: 12px;
  color: ${({ isActivePackage }) => (isActivePackage ? "#f8f9fa" : "#fff")};
  font-weight: ${({ isActivePackage }) => (isActivePackage ? "600" : "400")};
  transition: font-weight 0.2s ease-in-out;
`;

export default PriceCard;
