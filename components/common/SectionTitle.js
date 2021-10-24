import styled from "styled-components";

const AppSectionTitle = ({ title }) => {
  return <SectionTitle>{title}</SectionTitle>;
};

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;
  padding-bottom: 60px;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 40px;
  }

  @media (max-width: 319px) {
    font-size: 18px;
  }
`;

export default AppSectionTitle;
