/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoPlayCircleOutline } from 'react-icons/io5';
import ModalVideo from 'react-modal-video';
import styled from "styled-components";
import classNames from "classnames";

import DemoBlogHeadline from "@/components/pages/landing/Banner/components/DemoBlogHeadline";
import DemoParaphrase from "@/components/pages/landing/Banner/components/DemoParaphrase";

import { GoogleButton, FacebookButton } from "@/components/common/AuthButton";
import { isServer } from "@/utils";

const baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

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

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  });

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
              <h1 className="fw-bold display-5 pt-md-5">
                Make Your Writing Smarter and Faster
              </h1>
              <p className="lead me-3">
                We help freelancers, copywriters, and businesses create compelling content that drives conversions and sales.
              </p>
              <div className="action-btns mt-5 align-items-center flex d-sm-flex d-lg-flex d-md-flex">
                {/* <Link href="/request-demo">
                  <a className="btn btn-primary me-3">Request For Demo</a>
                </Link> */}
                <div className="action-btns me-3">
                  <GoogleButton extras=''
                    clickEvent={() => handleStrategyAction("google")}
                    title={"Sign up with Google"}
                  />
                </div>
                {/* <div>
                    <a href='#!'
                      onClick={() => setOpen(true)}
                      type="button"
                      className="text-white text-decoration-none d-inline-flex align-items-center watch-now-btn"
                    >
                      <IoPlayCircleOutline className="me-2" /> Watch Demo
                    </a>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 ">
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
          </div>
        </div>
      </div>
    </section>
  );
};

const Demo = styled.div`
  @media screen and (max-width: 1060px) {
    margin-top: 12rem;
    width: 80%
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

export default HeroSectionOne;
