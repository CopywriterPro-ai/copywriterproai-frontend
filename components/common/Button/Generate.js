import React from "react";
import styled from "styled-components";

const Generate = ({ title = "Generate", clickEvent, disabled = false }) => {
  return (
    <GenerateButton disabled={disabled} onClick={clickEvent}>
      {title}
    </GenerateButton>
  );
};

const GenerateButton = styled.button`
  font-weight: 500;
  font-size: 16px;
  color: white;
  border: none;
  background: rgba(15, 160, 152, 1);
  backdrop-filter: blur(1px);
  padding: 8px 28px;
  border-radius: 7px;

  &:disabled {
    background: rgba(15, 160, 152, 0.5);
  }
`;

export default Generate;
