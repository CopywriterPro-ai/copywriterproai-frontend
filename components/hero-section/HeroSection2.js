/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { IoPlayCircleOutline } from "react-icons/io5";
import { FiLifeBuoy, FiGithub, FiFigma } from "react-icons/fi";
import ModalVideo from "react-modal-video";
import styled from "styled-components";
import classNames from "classnames";

import DemoBlogHeadline from "@/components/pages/landing/Banner/components/DemoBlogHeadline";
import DemoParaphrase from "@/components/pages/landing/Banner/components/DemoParaphrase";

import { GoogleButton, FacebookButton } from "@/components/common/AuthButton";
import { isServer } from "@/utils";

const baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

const brands = [
  { name: "airbnb" },
  { name: "Google" },
  { name: "Microsoft" },
  { name: "spotify" },
  { name: "Mailchimp" },
  { name: "Mashable" },
];

const features = [
  {
    id: "open-source",
    title: "Open Source: Access, Modify, and Improve",
  },
  {
    id: "ai-powered",
    title: "Al-Powered: High-Quality Content Tailored to You",
  },
  { id: "seo-friendly", title: "SEO-Friendly: Boost Your Online Visibility" },
];

const handleStrategyAction = (strategy) => {
  if (!isServer) window.open(`${baseURL}/v1/auth/${strategy}`, "_self");
};

const SliderContent = [
  { Slider: DemoParaphrase },
  { Slider: DemoBlogHeadline },
];

const HeroSectionOne = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentSlide, setCurrentSlide] = useState({
    Slider: SliderContent[0].Slider,
  });

  const handleActiveSlide = (index) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    const current = SliderContent.find((slide, index) => index === activeSlide);
    setCurrentSlide(current);
  }, [activeSlide]);

  const { Slider } = currentSlide;

  const [isOpen, setOpen] = useState(false);

  return (
    <section
      className="hero-section ptb-120 text-white bg-gradient"
      style={{ background: "url('/hero-dot-bg.png')no-repeat center right" }}
    >
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="aQFao8lz6C8"
        onClose={() => setOpen(false)}
      />
      <div className="container">
        <div className="row align-items-center mt-40">
          <div className="col-lg-6 col-md-10">
            <div className="hero-content-wrap mt-100 mt-lg-0 mt-xl-0">
              <HeadingStyle>
                Open-Source Al Writing Platform for SEO and Ad Copy
              </HeadingStyle>
              <DescriptionStyle>
                CopywriterPro is the world&apos;s first open-source Al content
                writing platform that empowers users to create SEO-friendly blog
                posts, ad copy for social media, website landing pages, and
                more. With its advanced Al algorithms and versatile content
                creation capabilities, CopywriterPro offers unparalleled
                flexibility and freedom.
              </DescriptionStyle>

              <FeaturesStyle>
                {features.map((feature) => (
                  <FeatureStyle key={feature.id}>
                    <FiLifeBuoy /> {feature.title}
                  </FeatureStyle>
                ))}
              </FeaturesStyle>

              <div className="action-btns mt-5 align-items-center flex d-sm-flex d-lg-flex d-md-flex">
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <ActionBtn>
                    <FiGithub />
                    View on Github
                  </ActionBtn>
                  <ActionBtn onClick={() => handleStrategyAction("google")}>
                    <FiFigma />
                    Try for free
                  </ActionBtn>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 ">
            <img
              width="100%"
              src="https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: "50px" }}>
        <div
          style={{
            display: "flex",
            overflow: "hidden",
            justifyContent: "space-around",
          }}
        >
          {brands.map((brand) => (
            <div key={brand.name} title={brand.name}>
              <img width="180px" src="/logo-color.svg" alt={brand.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Demo = styled.div`
  @media screen and (max-width: 1060px) {
    margin-top: 12rem;
    width: 80%;
    display: flex;
    justify-content: center;
  }
`;

const DemoContainer = styled.div`
  poition: relative;
`;

const DemoContent = styled.div`
  position: relative;
  display: flex;

  @media screen and (max-width: 1060px) {
    flex-direction: column;
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

const HeadingStyle = styled.h1`
  margin-bottom: 15px;
`;

const DescriptionStyle = styled.p``;

const FeaturesStyle = styled.div``;

const FeatureStyle = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 5px;
`;

const ActionBtn = styled.div`
  align-items: center;
  border-radius: 8px;
  border: 1px solid gray;
  cursor: pointer;
  display: flex;
  gap: 6px;
  justify-items: center;
  padding: 8px 20px;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export default HeroSectionOne;
