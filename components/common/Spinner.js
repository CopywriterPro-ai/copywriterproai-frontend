import React from "react";
import styled from "styled-components";
import { Spinner } from "reactstrap";

const AppSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner style={{ width: "3rem", height: "3rem" }} color="dark" />
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export default AppSpinner;
