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

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  });

  const { Slider } = currentSlide;

  return (
    <Container>
      <Hero>
        <Copy>
          <Heading>
            Your words, amplified.
          </Heading>
          <Subheading>
            Our AI-Powered Copywriter will find the right words for whatever you need to say.
          </Subheading>
          <Auth>
            <AuthButton
              bgColor="rgba(66, 133, 244, 0.9)"
              onClick={() => handleStrategyAction("google")}
            >
              <BannerAuthButtonImg src={GoogleAuthLogo.src} alt="google" />
              <span>Sign up with Google</span>
            </AuthButton>
            <AuthButton
              bgColor="rgba(66, 103, 178, 0.9)"
              onClick={() => handleStrategyAction("facebook")}
            >
              <BannerAuthButtonImg src={FacebookAuthLogo.src} alt="facebook" />
              <span>Sign up with Facebook</span>
            </AuthButton>
          </Auth>
        </Copy>
        <Demo>
          <DemoContainer>
            <DemoContent>
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
            </DemoContent>
          </DemoContainer>
        </Demo>
      </Hero>
    </Container>
  );
};

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 7.5rem 3.5rem 5rem 3.5rem;
  font-size: 15.5px;
  position: relative;

  @media (min-width: 1440px) {
    max-width: 1440px;
  }

  @media screen and (max-width: 1250px) {
    padding-top: 5rem;
  }

  @media (max-width: 550px) {
    padding: 5rem 2rem 5rem 2rem;
  }
`;

const Hero = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 4rem;
  align-items: center;

  @media screen and (max-width: 1250px) {
    column-gap: 3rem;
  }

  @media screen and (max-width: 1060px) {
    display: flex;
    flex-direction: column;
  }
`;

const Copy = styled.div`
  color: rgb(102, 178, 255);
  margin-right: 1.5rem;

  @media screen and (max-width: 1250px) {
    margin-right: 0;
  }

  @media screen and (max-width: 1060px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Demo = styled.div`
  @media screen and (max-width: 1060px) {
    margin-top: 12rem;
    width: 75%;
  }
`;

const Heading = styled.h1`
  font-weight: 700;
  font-size: 75px;
  line-height: 100px;

  @media screen and (max-width: 1250px) {
    font-size: 65px;
    line-height: 80px;
  }

  @media screen and (max-width: 1060px) {
    font-size: 56px;
  }
`;

const Subheading = styled.p`
  font-weight: 400;
  font-size: 25px;
  line-height: 1.7;
  // color: #7E8BB6;
  color: #fff;
  margin: 1.8rem 0 1.8rem 0;

  @media screen and (max-width: 1250px) {
    font-size: 20px;
  }

  @media screen and (max-width: 1060px) {
    font-size: 21px;
    width: 90%;
    text-align: center;
    margin: 1.2rem 0 1.2rem 0;
  }
`;

const Auth = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: 1250px) {
    gap: 0.5rem;
  }

  @media screen and (max-width: 1060px) {
    gap: 1.5rem;
    width: 80%;
  }
`;

const AuthButton = styled.div`
  background: ${({ bgColor }) => bgColor};
  border-radius: 50px;
  border: 1.5px solid #000000;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 450;
  user-select: none;
  width: 50%;
  text-align: center;
  padding: 0.3rem 0;

  span {
  }

  img {
    height: 26px;
    margin: 8px 12px 8px 0px;
  }

  .sm-text {
    display: none;
  }

  @media screen and (max-width: 1250px) {
    font-size: 14px;

    img {
      height: 20px;
      margin-right: 8px;
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

const DemoContainer = styled.div`
  poition: relative;
`;

const MediaContent = styled.div`
  opacity: 0;
  &.loaded {
    opacity: 1;
    transition: opacity .5s ease-in;
  }
`;

const DemoContent = styled.div`
  position: relative;
  display: flex;

  @media screen and (max-width: 1060px) {
    flex-direction: column;
  }
`;

const HeaderIllustration = styled.div`
  position: absolute;
  top: -100px;
  right: 0;

  img,
  svg {
    width: 100%;
  }

  @media (max-width: 1440px) {
    width: calc(100vw * 0.9);
  }
`;

const HeroMediaIllustration = styled.div`
  position: absolute;
  top: -10%;
  left: -15px;

  img,
  svg {
    max-width: 136%;
  }
`;

const HeroMediaContainer = styled.div`
  position: absolute;
  top: 100px;
  right: 0px;
  overflow: hidden;
  text-align: end;

  @media screen and (max-width: 1370px) {
    top: 130px;
  }

  @media screen and (max-width: 1280px) {
    top: 145px;
  }

  @media screen and (max-width: 1250px) {
    top: 80px;
  }

  @media screen and (max-width: 1150px) {
    top: 110px;
  }

  @media screen and (max-width: 1060px) {
    display: none;
  }

  img {
		object-fit: cover;
    margin: 0 auto;
  }

  @media (max-width: 1440px) {
    img {
      width: calc(100vw * 0.493);
    }
  }
`;

const SliderControl = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 0;
  margin-left: 1rem;

  @media screen and (max-width: 1060px) {
    margin-left: 0;
    margin-top: 0.5rem;
    justify-content: center;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SliderDot = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  gap: 5px;

  li {
    margin: 5px;

    button {
      background: white;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      height: 20px;
      outline: none;
      padding: 5px;
      width: 20px;
    }

    .active {
      background: #0096f6;
    }
  }

  @media screen and (max-width: 1060px) {
    display: flex;

    li {
      margin: 3px;
    }
  }
`;

export default Banner;
