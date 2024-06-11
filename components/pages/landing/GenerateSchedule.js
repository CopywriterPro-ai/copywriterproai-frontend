import React from "react";
import styled from "styled-components";
import YouTubeEmbed from "@/components/YouTubeEmbed";

import Choose from "@/assets/images/landing/schedule-section/choose.png";
import Define from "@/assets/images/landing/schedule-section/define.png";
import Generate from "@/assets/images/landing/schedule-section/generate.png";
import { useWindowSize } from "@/hooks";
import { isServer } from "@/utils";

const ScheduleCard = ({
  imgSrc,
  color = "#1CC14A",
  backgroundColor = "#D8FFDC",
  title,
  description,
}) => {
  return (
    <Card className="card">
      <CardBody className="card-body">
        <FlexCard>
          <CardIconContainer>
            <CardIcon backgroundColor={backgroundColor} color={color}>
              <CardIconImg src={imgSrc.src} alt="tutorial img" />
            </CardIcon>
          </CardIconContainer>

          <CardDetailsContainer>
            <h2>{title}</h2>
            <p>{description}</p>
          </CardDetailsContainer>
        </FlexCard>
      </CardBody>
    </Card>
  );
};

const Card = styled.div`
  margin: 30px -15px;
  border: 0px;
  margin: auto;

  @media (max-width: 425px) {
    display: block;
  }
`;

const CardBody = styled.div`
  padding: 1rem;

  @media (max-width: 1200px) {
    padding: 1rem 8px;
  }

  @media only screen and (max-width: 768px) {
    padding: 1.5rem 0.6rem;
  }

  @media (max-width: 535px) {
    display: flex;
    justify-content: center;
    padding: 1rem 1rem;
  }
`;

const FlexCard = styled.div`
  display: flex;

  @media (max-width: 425px) {
    display: block;
  }
`;

const CardIconContainer = styled.div`
  flex: 1;
  margin-right: 0px;

  @media (max-width: 425px) {
    display: flex;
    justify-content: center;
  }
`;

const CardDetailsContainer = styled.div`
  flex: 6;
  margin-left: -2px;
  h2 {
    font-size: 21px;
  }
  p {
    font-size: 18px;
    line-height: 30px;
    color: #686868;
    margin: 0;
  }

  @media (max-width: 1200px) {
    h2 {
      font-size: 20px;
    }

    p {
      font-size: 17px;
    }
  }

  @media (max-width: 992px) {
    margin-left: 10px;

    h2 {
      font-size: 17px;
      line-height: 21px;
      margin-top: 8px;
    }

    p {
      font-size: 14px;
      line-height: 27px;
      margin-right: 20px;
      width: 331px;
    }
  }

  @media only screen and (max-width: 768px) {
    margin-left: 10px;

    h2 {
      font-size: 21px;
      line-height: 21px;
      // margin-left: -6%;
      margin-top: 8px;
    }

    p {
      font-size: 18px;
      margin-right: 0px;
      width: 425px;
    }
  }

  @media (max-width: 535px) {
    margin-left: 10px;

    h2 {
      font-size: 18px;
    }

    p {
      font-size: 14px;
      // margin-right: 0px;
      width: 331px;
    }
  }

  @media (max-width: 425px) {
    margin-left: 0px;

    h2 {
      font-size: 17px;
      text-align: center;
      margin-top: 20px;
    }

    p {
      font-size: 14px;
      width: 331px;
      text-align: center;
    }
  }

  @media (max-width: 375px) {
    p {
      font-size: 15px;
      width: 280px;
      line-height: 29px;
    }
  }

  @media (max-width: 319px) {
    h2 {
      font-size: 16px;
    }

    p {
      font-size: 13px;
      width: 240px;
      line-height: 25px;
    }
  }
`;

const CardIcon = styled.div`
  position: relative;
  border: 2px solid ${({ color }) => color};
  height: 58px;
  width: 58px;
  border-radius: 50%;
  background: ${({ backgroundColor }) => backgroundColor};

  img {
    position: absolute;
    top: 13px;
    left: 13px;
    width: 28px;
  }

  @media (max-width: 1200px) {
    height: 49px;
    width: 49px;
    margin-top: 0px;

    img {
      top: 10px;
      left: 10px;
      width: 25px;
    }
  }

  @media (max-width: 992px) {
    height: 40px;
    width: 40px;
    margin-top: 10px;

    img {
      top: 9px;
      left: 9px;
      width: 18px;
    }
  }

  @media only screen and (max-width: 768px) {
    height: 50px;
    width: 50px;
    margin-top: 8px;

    img {
      top: 10px;
      left: 10px;
      width: 25px;
    }
  }

  @media (max-width: 535px) {
    height: 40px;
    width: 40px;
    padding-right: 0;

    img {
      top: 8px;
      left: 8px;
      width: 20px;
    }
  }
`;

const CardIconImg = styled.img`
  position: absolute;
  top: 13px;
  left: 13px;
  width: 28px;

  @media (max-width: 1200px) {
    top: 10px;
    left: 10px;
    width: 25px;
  }

  @media (max-width: 992px) {
    top: 9px;
    left: 9px;
    width: 18px;
  }

  @media only screen and (max-width: 768px) {
    top: 10px;
    left: 10px;
    width: 25px;
  }

  @media (max-width: 535px) {
    top: 8px;
    left: 8px;
    width: 20px;
  }
`;

const GenerateSchedule = () => {
  const handleDemo = () => {
    !isServer &&
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
  };

  const windowSize = useWindowSize();

  const isDesktop = windowSize?.width > 768;

  return (
    <ScheduleSection>
      <div className="row" style={{ alignItems: "center", margin: "0" }}>
        <ScheduleTextContainer
          className="col-md-12"
          style={{ marginTop: "5rem" }}
        >
          {/* <ScheduleCardText>
            <h4>3 Steps to make your copywriting masterpiece!</h4>
            {isDesktop && (
              <PrimaryButton
                clickEvent={handleDemo}
                className="btn"
                title="Try it now!"
              />
            )}
          </ScheduleCardText> */}
          <YoutubeVideo>
            <YouTubeEmbed
              id="aQFao8lz6C8"
              title="How to Use CopywriterPro AI To Create Brilliant Ad Copies."
              poster="maxresdefault"
              webp={true}
            />
          </YoutubeVideo>
        </ScheduleTextContainer>
        {/* <ScheduleCardContainer className="col-md-6">
          <ScheduleCard
            imgSrc={Choose}
            title="Choose"
            description="Select any option from our 40+ AI powered copywriting tools."
          />
          <ScheduleCard
            color="#CCA964"
            backgroundColor="#FFEBD8"
            imgSrc={Define}
            title="Define"
            description="Tell us about your business, product or the goal you want to achieve."
          />
          <ScheduleCard
            color="#48BCD5"
            backgroundColor="#D8FAFF"
            imgSrc={Generate}
            title="Generate"
            description="Get multiple results just by clicking “Generate” and edit them to match your need."
          />
        </ScheduleCardContainer> */}
      </div>
    </ScheduleSection>
  );
};

const ScheduleSection = styled.div`
  margin: 120px 0px;

  @media (max-width: 768px) {
    margin: 35px 0;
  }
`;

const ScheduleTextContainer = styled.div`
  /* margin-left: -60px; */
  height: 450px;

  @media (max-width: 768px) {
    background-image: none;
    margin-left: 0px;
    text-align: center;
    height: auto;
  }

  @media only screen and (max-width: 768px) and (min-width: 768px) {
    max-width: 100%;
    flex: 0 0 100%;
  }
`;

const ScheduleCardText = styled.div`
  margin-top: 100px;
  margin-left: 100px;
  width: 80%;

  @media (max-width: 1200px) {
    margin-top: 120px;
  }

  @media (max-width: 992px) {
    margin-left: 80px;
    margin-top: 140px;
  }

  @media (max-width: 768px) {
    margin-top: 35px;
    margin-left: 0px;
    width: 100%;
  }

  h4 {
    font-size: 28px;
    line-height: 55px;

    @media (max-width: 1200px) {
      padding: 7px 0px;
      font-size: 22px;
      line-height: 45px;
    }

    @media (max-width: 992px) {
      padding: 7px 0px;
      font-weight: 500;
      font-size: 17px;
      line-height: 35px;
    }

    @media (max-width: 768px) {
      padding: 30px 0px;
      font-weight: 600;
      font-size: 24px;
      line-height: 45px;
      width: 80%;
      margin: auto;
    }

    @media (max-width: 535px) {
      font-size: 21px;
    }

    @media (max-width: 375px) {
      font-size: 18px;
      line-height: 40px;
      width: 100%;
    }

    @media (max-width: 319px) {
      font-size: 16px;
      line-height: 35px;
    }
  }
`;

const ScheduleCardContainer = styled.div`
  // margin-left: 40px;

  @media (max-width: 1200px) {
    margin-left: 0;
    padding-left: 0;
    padding-right: 0;
  }

  @media (max-width: 992px) {
    margin-left: 0px;
  }

  @media only screen and (max-width: 768px) and (min-width: 768px) {
    display: contents;
  }
`;

const YoutubeVideo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export default GenerateSchedule;
