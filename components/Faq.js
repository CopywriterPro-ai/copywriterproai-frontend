import { useState } from "react";
import styled from "styled-components";
import { Card, CardText, Collapse } from "reactstrap";

import SectionTitle from "@/components/common/SectionTitle";
import FAQDatas from "data/faqsection.json";

const MOBILE_SCREEN_MAX = 900;
const FAQDataListBreakPoint = FAQDatas.length / 2;

const Faq = () => {
  const [current, setCurrent] = useState({ id: null, isOpen: false });

  const handleSetCurrent = (id) => {
    if (id === current.id) {
      setCurrent({ id: null, isOpen: false });
    } else {
      setCurrent({ id, isOpen: true });
    }
  };

  return (
    <Container>
      <SectionTitle title="Frequently Asked Questions" />
      <StyledFaq>
        <StyledFaqColumn key="one">
          {FAQDatas.map((faq, idx) => {
            if(idx <= FAQDataListBreakPoint) {
              const isActive = faq.id === current.id && current.isOpen;
              return (
                <FAQCard key={faq.id} onClick={() => handleSetCurrent(faq.id)}>
                  <StyledFaqQuestion>
                    <StyledFaqTitle>
                      <FAQQuestion>{faq.question}</FAQQuestion>
                      {isActive ? (
                        <i className="fas fa-chevron-up"></i>
                      ) : (
                        <i className="fas fa-chevron-down"></i>
                      )}
                    </StyledFaqTitle>
                    <StyledCollapse isOpen={isActive}>
                      <StyledCardText className="card-text-sm" aria-expanded="false">
                        {faq.answer}
                      </StyledCardText>
                    </StyledCollapse>
                  </StyledFaqQuestion>
                </FAQCard>
              );
            }
          })}
        </StyledFaqColumn>
        <StyledFaqColumn key="two">
          {FAQDatas.map((faq, idx) => {
            if(idx > FAQDataListBreakPoint) {
              const isActive = faq.id === current.id && current.isOpen;
              return (
                <FAQCard key={faq.id} onClick={() => handleSetCurrent(faq.id)}>
                  <StyledFaqQuestion>
                    <StyledFaqTitle>
                      <FAQQuestion>{faq.question}</FAQQuestion>
                      {isActive ? (
                        <i className="fas fa-chevron-up"></i>
                      ) : (
                        <i className="fas fa-chevron-down"></i>
                      )}
                    </StyledFaqTitle>
                    <StyledCollapse isOpen={isActive}>
                      <StyledCardText className="card-text-sm" aria-expanded="false">
                        {faq.answer}
                      </StyledCardText>
                    </StyledCollapse>
                  </StyledFaqQuestion>
                </FAQCard>
              );
            }
          })}
        </StyledFaqColumn>
      </StyledFaq>
    </Container>
  );
};

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 7.5rem 3.5rem 5rem 3.5rem;
  font-size: 15.5px;
  
  @media (min-width: 1440px) {
    max-width: 1440px;
  }

  @media (max-width: 550px) {
    padding: 5rem 2rem 5rem 2rem;
  }
`;

const StyledFaq = styled.div`
  width: 100%;
  display: flex;
  gap: 3rem;

  @media (max-width: ${MOBILE_SCREEN_MAX}px) {
    flex-direction: column;
    gap: 0;
  }
`;

const FAQCard = styled(Card)`
  color: #1A2027;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border: 1px solid #E7EBF0;
  background-color: #fff;
  border-color: #E0E3E7;
  border-radius: 10px;
  position: relative;
  transition: margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  overflow-anchor: none;
  padding: 20px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  margin-bottom: 25px;

  &:hover {
    box-shadow: 1px 1px 20px 0 rgb(90 105 120 / 20%);
  }
`;

const StyledFaqColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
`;

const StyledFaqQuestion = styled.div``;

const StyledFaqTitle = styled.div`
  align-items: flex-start;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  user-select: none;

  i {
    // color: #007fff;
    color: darkcyan;
  }
`;

const FAQQuestion = styled.h3`
  padding-right: 20px;
  font-size: 15.5px;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 0;

  @media (max-width: 1350px) {
    font-size: 14.5px;
  }

  @media (max-width: 1200px) {
    font-size: 13.5px;
  }
`;

const StyledCollapse = styled(Collapse)`
`;

const StyledCardText = styled(CardText)`
  margin-top: 15px;

  @media (max-width: 1350px) {
    font-size: 14.5px;
  }

  @media (max-width: 1200px) {
    font-size: 13.5px;
  }
`;

// const StyledFaq = styled.div`
//   align-items: flex-start;
//   display: flex;
//   flex-flow: row wrap;
//   gap: 1rem;
//   justify-content: flex-start;
// `;

// const StyledFaqQuestion = styled.div`
//   /* flex: 1 0 48%; */
//   flex-basis: 48%;
//   padding: 5px;

//   @media (max-width: 700px) {
//     /* flex: 1 0 100%; */
//     flex-basis: 100%;
//   }
// `;

// const StyledFaqTitle = styled.div`
//   align-items: center;
//   cursor: pointer;
//   display: flex;
//   justify-content: space-between;
//   user-select: none;
//   font-weight: 500;
//   margin-bottom: 1rem;

//   i {
//     color: #007fff;
//   }
// `;

// const StyledCollapse = styled(Collapse)`
//   max-width: 95%;
// `;

export default Faq;
