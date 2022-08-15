import styled from "styled-components";

const AppSectionTitle = ({ title, fontColor }) => {
  return <SectionTitle fontColor={ fontColor }>{title}</SectionTitle>;
};

const SectionTitle = styled.h2`
  color: ${props => props.fontColor || "black"};
  text-align: center;
  font-size: 37px;
  font-weight: 800;
  line-height: 45px;
  padding-bottom: 60px;

  @media (max-width: 768px) {
    font-size: 34px;
    line-height: 40px;
  }

  @media (max-width: 560px) {
    font-size: 27px;
    line-height: 40px;
  }
`;

export default AppSectionTitle;
