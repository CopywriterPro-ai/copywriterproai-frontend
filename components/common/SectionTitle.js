import styled from "styled-components";

const AppSectionTitle = ({ title }) => {
  return <SectionTitle>{title}</SectionTitle>;
};

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 37px;
  font-weight: 800;
  line-height: 45px;
  padding-bottom: 60px;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 40px;
  }

  @media (max-width: 375px) {
    font-size: 18px;
    line-height: 0px;
  }
`;

export default AppSectionTitle;
