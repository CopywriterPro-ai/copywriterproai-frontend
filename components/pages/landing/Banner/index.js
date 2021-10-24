import { useState, useEffect } from "react";
import styled from "styled-components";
import classNames from "classnames";

import PreGenerateBg from "@/assets/images/landing/try-generate-bg.png";
import BannerDirection from "@/assets/images/landing/banner-direction.png";
import GoogleAuthLogo from "@/assets/images/landing/google-auth.png";
import FacebookAuthLogo from "@/assets/images/landing/facebook-auth.png";
import DemoBlogHeadline from "./components/DemoBlogHeadline";
import DemoParaphrase from "./components/DemoParaphrase";

const baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

const SliderContent = [
  { Slider: DemoParaphrase },
  { Slider: DemoBlogHeadline },
];

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentSlide, setCurrentSlide] = useState({
    Slider: SliderContent[0].Slider,
  });

  const handleActiveSlide = (index) => {
    setActiveSlide(index);
  };

  const handleStrategyAction = (strategy) => {
    window.open(`${baseURL}/v1/auth/${strategy}`, "_self");
  };

  useEffect(() => {
    const current = SliderContent.find((slide, index) => index === activeSlide);
    setCurrentSlide(current);
  }, [activeSlide]);

  const { Slider } = currentSlide;

  return (
    <BannerSection>
      <BannerContainer className="row">
        <div className="col-md-6 pb-4 wrapper">
          <BannerHeading>
            Sales-Focused Copywriting: Get Your Marketing Copy in 20 seconds
          </BannerHeading>
          <BannerDesc>
            Write compelling, lead-generating copy & save your time & money.
          </BannerDesc>
          <BannerTryNow>
            <p>Let’s get to work. Try it now.</p>
            <BannerTryNowImg src={BannerDirection.src} alt="array" />
          </BannerTryNow>
          <BannerTrialNow>
            <span>Start Your 7-day Free Trial Now!</span>
            <p>No credit card required!</p>
          </BannerTrialNow>
          {/* <span className="mobile sign-up-text">Sign Up With - </span> */}
          <BannerAuth>
            <BannerAuthButton
              bgColor="rgba(66, 133, 244, 0.9)"
              onClick={() => handleStrategyAction("google")}
            >
              <BannerAuthButtonImg src={GoogleAuthLogo.src} alt="google" />
              <span>Sign up with Google</span>
            </BannerAuthButton>
            <BannerAuthButton
              bgColor="rgba(66, 103, 178, 0.9)"
              onClick={() => handleStrategyAction("facebook")}
            >
              <BannerAuthButtonImg src={FacebookAuthLogo.src} alt="facebook" />
              <span>Sign up with Facebook</span>
            </BannerAuthButton>
          </BannerAuth>
        </div>
        <div className="col-md-6 demo">
          <SampleOutputHeading>Sample Output</SampleOutputHeading>
          <PreGenerateContainer>
            <div>
              <Slider />
              <SliderControl>
                <SliderDot>
                  {SliderContent.map((slider, index) => (
                    <li key={index}>
                      <button
                        className={classNames({
                          active: activeSlide === index,
                        })}
                        onClick={() => handleActiveSlide(index)}
                      ></button>
                    </li>
                  ))}
                </SliderDot>
              </SliderControl>
            </div>
          </PreGenerateContainer>
        </div>
      </BannerContainer>
    </BannerSection>
  );
};

const BannerSection = styled.div``;

const BannerContainer = styled.div`
  padding-top: 10px;

  .demo {
    background-image: url(${PreGenerateBg.src});
    background-repeat: no-repeat;
    background-size: contain;
    padding-right: 0;
    left: 10px;
    margin-top: 10px;

    @media (max-width: 992px) {
      background-image: none;
      padding-right: 0px;
      left: 0;
    }

    @media only screen and (max-width: 768px) and (min-width: 768px) {
      max-width: 100%;
      flex: 0 0 100%;
    }
  }

  .wrapper {
    padding-right: 0px;

    @media only screen and (max-width: 768px) and (min-width: 768px) {
      max-width: 100%;
      flex: 0 0 100%;
    }

    @media (max-width: 576px) {
      margin: 0px 9.5px;
    }

    @media (max-width: 535px) {
      margin: 10px;
    }
  }

  @media (max-width: 992px) {
    margin-right: 0px;
  }

  @media (max-width: 768px) {
    background-image: none;
    margin-right: 0px;

    .sign-up-text {
      font-weight: 600;
    }
  }
`;

const BannerHeading = styled.h2`
  font-weight: 600;
  font-size: 38px;
  line-height: 61px;
  margin-bottom: 0px;

  @media (max-width: 1200px) {
    font-size: 32px;
    line-height: 52px;
  }

  @media (max-width: 992px) {
    font-size: 23px;
    line-height: 40px;
  }

  @media (max-width: 768px) {
    font-size: 35px;
    line-height: 55px;
  }

  @media (max-width: 535px) {
    font-size: 25.5px;
    line-height: 45px;
  }

  @media (max-width: 425px) {
    font-size: 22px;
    line-height: 42px;
  }

  @media (max-width: 375px) {
    font-size: 18.5px;
    line-height: 34px;
  }

  @media (max-width: 319px) {
    font-size: 15.5px;
    line-height: 27.5px;
  }
`;

const BannerDesc = styled.p`
  font-weight: 400;
  font-size: 22px;
  line-height: 32px;
  color: rgba(0, 0, 0, 0.7);
  margin: 20px 0px 0px 0px;
  line-height: 35px;

  @media (max-width: 1200px) {
    font-size: 19px;
    margin: 13px 0px 0px 0px;
  }

  @media (max-width: 992px) {
    font-size: 16.5px;
    margin: 10px 0px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin: 15px 0px;
    line-height: 40px;
  }

  @media (max-width: 535px) {
    font-size: 21.5px;
  }

  @media (max-width: 425px) {
    font-size: 18.5px;
  }

  @media (max-width: 375px) {
    font-size: 15.5px;
    line-height: 30px;
  }

  @media (max-width: 319px) {
    font-size: 13px;
    line-height: 24px;
    margin: 8px 0px;
  }
`;

const BannerTryNow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2px 0px;

  p {
    margin: 0;
    font-weight: 500;
    font-size: 21px;
    color: rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 1200px) {
    p {
      margin: 0;
      font-size: 19px;
    }

    img {
      height: 3rem;
      margin-bottom: 17px;
    }
  }

  @media (max-width: 992px) {
    p {
      margin: 0;
      font-size: 16px;
    }

    img {
      height: 1.8rem;
      margin-bottom: 8px;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const BannerTryNowImg = styled.img`
  height: 4rem;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    height: 3rem;
    margin-bottom: 17px;
  }

  @media (max-width: 992px) {
    height: 1.8rem;
    margin-bottom: 8px;
  }
`;

const BannerTrialNow = styled.div`
  display: flex;
  align-items: center;
  margin: 0;

  span {
    font-weight: 600;
    font-size: 20px;
    color: #000;
    margin-right: 1rem;

    &:hover {
      text-decoration: none;
    }
  }

  p {
    margin: 0;
    font-size: 16px;
    text-decoration-line: underline;
  }

  @media (max-width: 1200px) {
    margin: 15px 0px;
    span {
      font-size: 17px;
    }

    p {
      font-size: 14px;
    }
  }

  @media (max-width: 992px) {
    display: block;
    margin: 10px 0px;
    span {
      font-size: 15px;
    }

    p {
      padding-top: 7px;
      font-size: 13px;
    }
  }

  @media (max-width: 768px) {
    display: block;
    margin: 15px 0px;
    span {
      font-size: 21px;
    }

    p {
      padding-top: 10px;
      font-size: 19px;
    }
  }

  @media (max-width: 535px) {
    span {
      font-size: 20px;
    }

    p {
      font-size: 16px;
    }
  }

  @media (max-width: 485px) {
    margin: 15px 0 0 0;
  }

  @media (max-width: 425px) {
    span {
      font-size: 18px;
    }

    p {
      font-size: 15px;
    }
  }

  @media (max-width: 375px) {
    span {
      font-size: 15px;
    }

    p {
      font-size: 13px;
      padding-top: 8px;
    }
  }

  @media (max-width: 319px) {
    margin: 0px 0px 12px 0px;

    span {
      font-size: 13px;
    }

    p {
      font-size: 12px;
      padding-top: 4px;
    }
  }
`;

const BannerAuth = styled.div`
  display: flex;
  align-items: center;
  padding-top: 17px;

  @media (max-width: 1200px) {
    padding-top: 5px;
  }

  @media (max-width: 485px) {
    display: block;
  }
`;

const BannerAuthButton = styled.div`
  background: ${({ bgColor }) => bgColor};
  border-radius: 50px;
  border: 1.5px solid #000000;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 450;
  margin-right: 12px;
  user-select: none;
  width: 48%;
  text-align: center;
  padding: 0.3rem 0;

  &:last-child {
    margin-right: 0px;
  }

  span {
  }

  img {
    height: 28px;
    margin: 8px 8px 8px 0px;
  }

  .sm-text {
    display: none;
  }

  @media (max-width: 1200px) {
    font-size: 15px;
    text-align: center;
    width: 50%;

    img {
      height: 23px;
    }
  }

  @media (max-width: 992px) {
    font-size: 11px;
    text-align: center;
    width: 50%;
    margin-right: 9px;

    img {
      height: 16px;
      margin-right: 6px;
    }

    .lg-text {
      display: none;
    }

    .sm-text {
      display: contents;
    }
  }

  @media (max-width: 768px) {
    padding: 5px 0px;
    font-size: 16px;
    margin-right: 12px;

    img {
      height: 19px;
      margin-right: 8px;
    }

    .lg-text {
      display: contents;
    }

    .sm-text {
      display: none;
    }
  }

  @media (max-width: 535px) {
    padding: 3px 0px;
    font-size: 14px;

    img {
      height: 18px;
    }
  }

  @media (max-width: 485px) {
    width: 100%;
    padding: 5px 0px;
    margin: 15px 0;

    font-size: 19px;

    img {
      height: 22px;
      margin: 8px 12px 8px 0px;
    }
  }

  @media (max-width: 425px) {
    padding: 2px 0px;
    font-size: 15px;

    img {
      height: 19px;
    }
  }

  @media (max-width: 375px) {
    padding: 0px;
    font-size: 14px;

    img {
      height: 16px;
    }
  }

  @media (max-width: 319px) {
    font-size: 12px;

    img {
      height: 14px;
    }
  }
`;

const BannerAuthButtonImg = styled.img`
  height: 28px;
  margin: 8px 8px 8px 0px;

  @media (max-width: 1200px) {
    height: 23px;
  }

  @media (max-width: 992px) {
    height: 16px;
    margin-right: 6px;
  }

  @media (max-width: 768px) {
    height: 19px;
    margin-right: 8px;
  }

  @media (max-width: 535px) {
    height: 18px;
  }

  @media (max-width: 485px) {
    height: 22px;
    margin: 8px 12px 8px 0px;
  }

  @media (max-width: 425px) {
    height: 19px;
  }

  @media (max-width: 375px) {
    height: 16px;
  }

  @media (max-width: 319px) {
    height: 14px;
  }
`;

const SampleOutputHeading = styled.h4`
  text-align: center;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  margin: 58px;

  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 375px) {
    font-size: 20px;
  }

  @media (max-width: 319px) {
    font-size: 18px;
    margin: 50px 0 40px 0;
  }
`;

const PreGenerateContainer = styled.div`
  padding-top: 30px;
  max-width: 85%;
  margin: 0 auto;
  margin-right: 68px;

  @media (max-width: 1200px) {
    padding-top: 25px;
    max-width: 88%;
    margin-right: 45px;
  }

  @media (max-width: 992px) {
    max-width: 95%;
    margin: 20px 0 auto auto;
    padding-right: 0;
    padding-top: 0;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0 45px;
  }

  @media (max-width: 768px) {
    margin: 0 10px;
  }
`;

const SliderControl = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 0;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SliderDot = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    display: inline-block;
    margin: 0 5px;

    button {
      background: #bfbfbf;
      border-radius: 50%;
      border: 1px solid black;
      cursor: pointer;
      height: 20px;
      outline: 0;
      padding: 5px;
      width: 20px;
    }

    .active {
      background: #3d8f8b;
    }
  }
`;

export default Banner;
