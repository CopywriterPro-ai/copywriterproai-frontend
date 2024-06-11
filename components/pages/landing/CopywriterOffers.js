import React from "react";
import styled from "styled-components";

import SectionTitle from "@/components/common/AppSectionTitle";
import OffersDatas from "@/data/landing/offerssection";

const OffersBox = ({ title, icon, list = [] }) => {
  return (
    <Container className="col-6 col-md-6 col-lg-4">
      <OffersBoxContainer>
        <OffersBoxIcon>
          <OffersBoxIconImg src={icon.src} alt="copywriterpro offer" />
        </OffersBoxIcon>
        <OffersBoxDetails>
          <h4>{title}</h4>
          <ul>
            {list.map((item, index) => (
              <li key={index}>{item.text}</li>
            ))}
          </ul>
        </OffersBoxDetails>
      </OffersBoxContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 35px 0;
`;

const OffersBoxContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const OffersBoxIcon = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    flex: none;
  }
`;

const OffersBoxIconImg = styled.img`
  width: 64px;
  @media (max-width: 768px) {
    width: 40px;
  }
`;

const OffersBoxDetails = styled.div`
  flex: 5;
  margin-left: 15px;
  margin-top: 15px;
  h4 {
    font-size: 20px;
    line-height: 33px;
  }
  ul {
    margin-top: 10px;
    padding-left: 35px;
    li {
      font-size: 20px;
      line-height: 33px;
    }
  }

  @media (max-width: 768px) {
    flex: none;
    margin-left: 0px;
    text-align: center;
    h4 {
      font-size: 14px;
      line-height: 21px;
    }
    ul {
      list-style-type: none;
      padding: 0;
      li {
        font-size: 13px;
        line-height: 19px;
      }
    }
  }
`;

const CopywriterOffers = () => {
  return (
    <CopywriterOffersSection id="features">
      <SectionTitle title="Features" />
      <div className="row justify-content-center">
        {OffersDatas.map((item, index) => (
          <OffersBox
            key={index}
            title={item.title}
            icon={item.icon}
            list={item.list}
          />
        ))}
      </div>
    </CopywriterOffersSection>
  );
};

const CopywriterOffersSection = styled.div`
  padding-top: 60px;

  @media (max-width: 768px) {
    div:nth-child(-n + 2) {
      margin-top: 0px;
    }
  }
`;

export default CopywriterOffers;
