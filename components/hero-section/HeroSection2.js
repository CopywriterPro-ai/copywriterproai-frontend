/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { FiLifeBuoy, FiGithub, FiKey, FiCheckCircle } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import ModalVideo from "react-modal-video";
import styled from "styled-components";
import classNames from "classnames";

import DemoBlogHeadline from "@/components/pages/landing/Banner/components/DemoBlogHeadline";
import DemoParaphrase from "@/components/pages/landing/Banner/components/DemoParaphrase";

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
    title: "AI-Powered: High-Quality Content Tailored to You",
  },
  { id: "seo-friendly", title: "SEO-Friendly: Boost Your Online Visibility" },
];

const apiFeatures = [
  {
    id: "seamless-integration",
    title: "Seamless Integration with Your Existing APIs",
  },
  {
    id: "no-extra-charges",
    title: "No Extra Charges for API Usage",
  },
  {
    id: "complete-control",
    title: "Complete Control Over Your Content Generation",
  },
];

const handleStrategyAction = (strategy) => {
  if (!isServer) window.open(`${baseURL}/v1/auth/${strategy}`, "_self");
};

const SliderContent = [
  { Slider: DemoParaphrase },
  { Slider: DemoBlogHeadline },
];

const HeroSectionTwo = () => {
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
      <>
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
                    Open-Source AI Writing Platform for SEO and Ad Copy
                  </HeadingStyle>
                  <DescriptionStyle>
                    CopywriterPro is the world's first open-source AI content
                    writing platform that empowers users to create SEO-friendly
                    blog posts, ad copy for social media, website landing pages,
                    and more. With its advanced AI algorithms and versatile
                    content creation capabilities, CopywriterPro offers
                    unparalleled flexibility and freedom.
                  </DescriptionStyle>

                  <FeaturesStyle>
                    {features.map((feature) => (
                        <FeatureStyle key={feature.id}>
                          <FiCheckCircle /> {feature.title}
                        </FeatureStyle>
                    ))}
                  </FeaturesStyle>

                  <div className="action-btns mt-5 align-items-center flex d-sm-flex d-lg-flex d-md-flex">
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                      <ActionBtn onClick={() => window.open("https://github.com/CopywriterPro-ai", "_blank")}>
                        <FiGithub />
                        View on Github
                      </ActionBtn>
                      <ActionBtn onClick={() => window.open("https://copywriterpro.ai/signup", "_self")}>
                        <FaGoogle />
                        Try for free
                      </ActionBtn>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 mt-4 mt-lg-0">
                <img
                    width="100%"
                    src="https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb"
                    alt="Screenshot"
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
        <section className="api-section ptb-120 bg-light text-dark">
          <div className="container">
            <div className="row align-items-center mt-40 flex-column-reverse flex-lg-row">
              <div className="col-lg-6 col-md-12 mt-4 mt-lg-0">
                <img
                    width="100%"
                    src="https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb"
                    alt="Onboard Screenshot"
                />
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="api-content-wrap mt-100 mt-lg-0 mt-xl-0">
                  <HeadingStyle>Use Your Own API Keys for Free</HeadingStyle>
                  <DescriptionStyle>
                    With CopywriterPro, you have the option to use your own API keys
                    for free. This means you can take advantage of all our powerful
                    features without any additional cost.
                  </DescriptionStyle>

                  <FeaturesStyle>
                    {apiFeatures.map((feature) => (
                        <FeatureStyle key={feature.id}>
                          <FiCheckCircle /> {feature.title}
                        </FeatureStyle>
                    ))}
                  </FeaturesStyle>

                  <div className="action-btns mt-5 d-sm-flex d-lg-flex d-md-flex">
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                      <ActionBtn onClick={() => window.open("https://copywriterpro.ai/signup", "_self")}>
                        <FiKey />
                        Add Your API Key
                      </ActionBtn>
                      <ActionBtn onClick={() => window.open("https://copywriterpro.ai/signup", "_self")}>
                        <FaGoogle />
                        Try for free
                      </ActionBtn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
  );
};

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

export default HeroSectionTwo;
