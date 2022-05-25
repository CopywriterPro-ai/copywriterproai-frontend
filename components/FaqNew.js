import { useState } from "react";
import styled from "styled-components";
import { Collapse } from "reactstrap";

import SectionTitle from "@/components/common/SectionTitle";
import FAQDatas from "data/faqsection.json";

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
        {FAQDatas.map((faq) => {
          const isActive = faq.id === current.id && current.isOpen;
          return (
            <StyledFaqQuestion key={faq.id}>
              <StyledFaqTitle onClick={() => handleSetCurrent(faq.id)}>
                {faq.question}
                {isActive ? (
                  <i className="fas fa-chevron-up"></i>
                ) : (
                  <i className="fas fa-chevron-down"></i>
                )}
              </StyledFaqTitle>
              <StyledCollapse isOpen={isActive}>{faq.answer}</StyledCollapse>
            </StyledFaqQuestion>
          );
        })}
      </StyledFaq>
    </Container>
  );
};

const Container = styled.div``;

const StyledFaq = styled.div`
  align-items: flex-start;
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  justify-content: flex-start;
`;

const StyledFaqQuestion = styled.div`
  flex: 0 1 48%;
  padding: 5px;
`;

const StyledFaqTitle = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  user-select: none;
  font-weight: 500;
  margin-bottom: 1rem;

  i {
    color: #007fff;
  }
`;

const StyledCollapse = styled(Collapse)`
  max-width: 95%;
`;

export default Faq;
