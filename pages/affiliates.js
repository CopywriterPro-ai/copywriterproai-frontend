/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { CondLayout as Layout } from "@/layout";

const AFFILIATE_PARCENTAGE = 35;
const MIN_RANGE = 1;
const MAX_RANGE = 100;

const plans = [
  { name: "Basic", price: 5, key: "basic", interval: "month" },
  { name: "Standard", price: 31, key: "standard", interval: "month" },
  { name: "Professional", price: 91, key: "professional", interval: "month" },
];

const AffiliateCalculate = ({ name, price, affiliateAmound, planKey }) => {
  const [referrals, setReferrals] = useState(MIN_RANGE);
  const [amound, setAmound] = affiliateAmound;

  const referralsChange = (refValue) => {
    setReferrals(refValue);
    const calAmound = Math.round(
      (AFFILIATE_PARCENTAGE / 100) * (price * refValue)
    );
    setAmound({ ...amound, [planKey]: calAmound });
  };

  useEffect(() => {
    const calculatePrice = Math.round(
      (AFFILIATE_PARCENTAGE / 100) * (price * MIN_RANGE)
    );
    setAmound(Object.assign(amound, { [planKey]: calculatePrice }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledAffiliateCalculate>
      <p style={{ flex: 2 }}>
        {name} plan (${price}/mo)
      </p>
      <div style={{ flex: 9, margin: "0 25px" }}>
        <Slider
          min={MIN_RANGE}
          max={MAX_RANGE}
          onChange={referralsChange}
          defaultValue={MIN_RANGE}
          step={1}
        />
      </div>

      <p style={{ flex: 1 }}>
        <strong>{referrals}</strong> referrals
      </p>
    </StyledAffiliateCalculate>
  );
};

const arrayAdd = (numArr = []) => {
  if (Array.isArray(numArr) && numArr.length) {
    return numArr.reduce((a, b) => a + b);
  } else {
    return 0;
  }
};

const terms = [
  "Self-referrals are not allowed (i.e. signing up for Testimonial through your own affiliate link)",
  "Abuse, gaming, or attempting to mislead (i.e. posting fake discounts to coupon-sharing websites) will result in your account being permanently banned.",
  "In some cases, we can give credit to an affiliate even if the customer didn’t sign up through an affiliate link or coupon code. If you have a case like this, please contact us and well do our best to help.",
  "No search engine ads (especially on branded terms or domain names), Facebook ads or other ads that would compete with our own marketing and cause potential confusion for customers.",
  "No search engine ads (especially on branded terms or domain names), Facebook ads or other ads that would compete with our own marketing and cause potential confusion for customers.",
  "No Facebook ads that link to our website or anything similar that would compete with our own paid marketing and drive up our costs and potentially cause confusion.",
  "No pretending to be acting on behalf of us (ie. as an employee).",
  "We reserve the right to change the Terms of Service for our affiliate program at any time.",
];

const works = [
  {
    icon: "fas fa-hand-paper",
    text: "Sign up our affiliate program and get a unique link that can be shared",
  },
  {
    icon: "fas fa-share-alt",
    text: "Share your link with your friends, customers, clients...",
  },
  {
    icon: "fas fa-money-bill",
    text: "You'll get 35% recurring commission for every successful referral",
  },
];

const Affiliates = () => {
  const affiliateAmound = useState({});
  const [amound] = affiliateAmound;
  const affiliateTotal = arrayAdd(Object.values(amound));

  const handleJoinAffiliate = () => {
    if (typeof window !== "undefined") {
      window.location.href = "https://copywriterpro.getrewardful.com/signup";
    }
  };

  const handlLoginAffiliate = () => {
    if (typeof window !== "undefined") {
      window.location.href = "https://copywriterpro.getrewardful.com/login";
    }
  };

  return (
    <Layout>
      <Container>
        <Section>
          <SectionHead>
            <h1>Become Our Partner, Get 35% Commission</h1>
            <p>
              Partner with us to earn a recurring 35% commission every month!{" "}
              <br />
              {/* Your referred customer will also get 15% off for the first year. */}
            </p>
          </SectionHead>
          <ButtonGroup>
            <JoinAffiliateBtn onClick={handleJoinAffiliate}>
              Join our affiliate program
            </JoinAffiliateBtn>
            <LoginAffiliateDashboard onClick={handlLoginAffiliate}>
              Login to affiliate dashboard
            </LoginAffiliateDashboard>
          </ButtonGroup>
          <PoweredSection>
            <PoweredBy>
              <PoweredByItem>
                <img
                  src="https://testimonial.to/static/media/rewardful.bce901b7.svg"
                  alt="Rewardful"
                />
                <p>Full featured dashboard (Powered by Rewardful)</p>
              </PoweredByItem>
              <PoweredByItem>
                <img
                  src="data:image/png;base64,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"
                  alt="Paypal"
                />
                <p>Monthly payout via PayPal. No minimum threshold!</p>
              </PoweredByItem>
            </PoweredBy>
          </PoweredSection>
        </Section>
        <Section MaxWidth="48rem">
          <SectionHead>
            <h2>
              You can earn <span>${affiliateTotal}</span> every month
            </h2>
            <p>The calculation is based on monthly price</p>
          </SectionHead>
          <div>
            {plans.map((plan) => (
              <AffiliateCalculate
                key={plan.key}
                planKey={plan.key}
                name={plan.name}
                price={plan.price}
                affiliateAmound={affiliateAmound}
              />
            ))}
          </div>
        </Section>
        <Section MaxWidth="48rem">
          <SectionHead>
            <h2>How it works</h2>
          </SectionHead>
          <div>
            {works.map((work, index) => (
              <StyledWorkItem key={index}>
                <span className={work.icon}></span>
                <p>{work.text}</p>
              </StyledWorkItem>
            ))}
          </div>
        </Section>
        <Section MaxWidth="48rem">
          <SectionHead>
            <h2>Affiliate terms</h2>
            <p>
              There are a few rules about our affiliate program you should know
              about. No “gotchas” here, just some terms to keep everyone happy.
            </p>
          </SectionHead>
          <div>
            <StyledTermList>
              {terms.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </StyledTermList>
          </div>
        </Section>
        <Section
          MaxWidth="100%"
          style={{ background: "#F5F3FF", padding: "90px 0" }}
        >
          <SectionHead>
            <h2>Ready to partner with us?</h2>
            <JoinAffiliateBtn onClick={handleJoinAffiliate}>
              Join our affiliate program
            </JoinAffiliateBtn>
          </SectionHead>
        </Section>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  padding: 0 5px;
`;

const Section = styled.section`
  margin: 7rem auto;
  padding: 0 5px;
  max-width: ${({ MaxWidth }) => (MaxWidth ? MaxWidth : "72rem")};
`;

const SectionHead = styled.div`
  text-align: center;

  h1 {
    font-weight: 800;
    line-height: 1.25;
    font-size: 3.2rem;
    margin-bottom: 2rem;
  }
  h2 {
    font-weight: 800;
    line-height: 1.25;
    margin-bottom: 2rem;
    font-size: 2.2rem;
  }
  p {
    color: gray;
    font-size: 20px;
    line-height: 30px;
    margin-top: 1rem;
  }
  span {
    color: #33b19b;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Btn = styled.button`
  background: #f1f1f1;
  border: 0;
  padding: 0.8rem 2rem;
  font-size: 1.125rem;
  border-radius: 4px;
  margin: 0 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 10px 0px;
  }
`;

const JoinAffiliateBtn = styled(Btn)`
  background: #33b19b;
  color: white;
`;

const LoginAffiliateDashboard = styled(Btn)`
  background: white;
  color: #33b19b;
`;

const StyledAffiliateCalculate = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`;

const StyledWorkItem = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;

  span {
    margin-right: 15px;
    background: #33b19b;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    margin: 0;
    color: #55595f;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

const StyledTermList = styled.ul`
  li {
    margin: 25px 0;
    color: #55595f;
    font-size: 17px;
    line-height: 24px;
  }
`;

const PoweredSection = styled.div`
  max-width: 42rem;
  margin: 0 auto;
`;

const PoweredBy = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5rem;
`;

const PoweredByItem = styled.div`
  text-align: center;
  max-width: 15rem;
  img {
    height: 40px;
  }
  p {
    padding-top: 1.8rem;
    color: #55595f;
    font-size: 18px;
    line-height: 27px;
  }
`;

export default Affiliates;
