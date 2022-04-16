import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const StyledLoading = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeadingMessage = styled.div`
  margin-bottom: 2rem;
  max-width: fit-content;

  /* h4 {
    font-weight: 600;
    font-size: 25px;
  }

  @media (max-width: 768px) {
    h4 {
      font-weight: 500;
      font-size: 20px;
    }
  } */
`;

export const StyledCurrentPlan = styled.div`
  text-transform: capitalize;
  font-weight: 500;
  font-size: 15px;
`;

export const StyledPeriodTab = styled.div`
  margin: 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    position: absolute;
    left: 0;
    margin: 0;
    font-weight: 600;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    p {
      position: relative;
      align-self: flex-start;
      font-size: 16px;
      margin-bottom: 1rem;
    }
  }
`;

export const StyledTabs = styled.div`
  display: flex;
  border: 1px solid #000000;
  border-radius: 5px;
  outline: 0;
`;

export const StyledTab = styled.div`
  background-color: ${({ Active }) => (Active === "active" ? "#3A95E9" : null)};
  border-radius: 4px;
  border: 0;
  color: ${({ Active }) => (Active === "active" ? "#FFFFFF" : null)};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  outline: 0;
  padding: 5px 20px;
  text-align: center;
  user-select: none;
`;

export const StyledUpgrade = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
`;

export const StyledUpgradeButton = styled.button`
  min-width: 35%;
  height: 2.5rem;
  background: #3a95e9;
  border: 0.5px solid #979797;
  border-radius: 7px;
  color: white;
  user-select: none;
`;
