import { useState, Fragment } from "react";
import styled from "styled-components";
import { Collapse, CardBody, Card } from "reactstrap";

import SectionTitle from "@/components/common/SectionTitle";
import FAQDatas from "data/faqsection.json";

const FAQItem = ({ item, current, setCurrent }) => {
  const { id, question, answer } = item;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setCurrent(id);
    if (current !== id) {
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const isCurrentOpen = isOpen && id === current;

  return (
    <Fragment>
      <FAQTitle isOpen={isCurrentOpen.toString()} onClick={toggle}>
        <FAQText>{question}</FAQText>
        <FAQIcon>
          {isCurrentOpen ? (
            <i className="fas fa-chevron-up"></i>
          ) : (
            <i className="fas fa-chevron-down"></i>
          )}
        </FAQIcon>
      </FAQTitle>
      <Collapse isOpen={isCurrentOpen}>
        <Flex>
          <FAQAnsContainer>
            <FAQCard>
              <CardBody>
                <FAQAns>{answer}</FAQAns>
              </CardBody>
            </FAQCard>
          </FAQAnsContainer>
        </Flex>
      </Collapse>
    </Fragment>
  );
};

const FAQ = () => {
  const [current, setCurrent] = useState(null);

  return (
    <FAQSection>
      <div className="row justify-content-center">
        <div className="col-md-9">
          <SectionTitle title="Frequently Asked Questions" />
          {FAQDatas.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              current={current}
              setCurrent={setCurrent}
            />
          ))}
        </div>
      </div>
    </FAQSection>
  );
};

const FAQSection = styled.div`
  padding-top: 60px;
  padding-bottom: 60px;
`;

const Flex = styled.div`
  display: flex;
`;

const FAQTitle = styled(Flex)`
  font-size: 22px;
  font-weight: 500;
  line-height: 38px;
  margin: 30px 0;
  padding-bottom: ${({ isOpen }) => (isOpen === "true" ? null : `25px`)};
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 21px;
  }
`;

const FAQIcon = styled.div`
  flex: 1;
  text-align: right;
  i {
    color: gray;
  }
`;

const FAQText = styled.div`
  flex: 11;
`;

const FAQAnsContainer = styled.div`
  width: 100%;
`;

const FAQCard = styled(Card)`
  border-radius: 0.75rem;
  border-left: 10px solid #3ab55c;
`;

const FAQAns = styled.p`
  font-size: 22px;
  font-weight: 500;
  line-height: 35px;
  color: #717171;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 21px;
  }
`;

export default FAQ;
