import React from "react";
import styled, { keyframes } from "styled-components";

const NuxButton = ({
  showCaret = true,
  title = "Click Here",
  style,
  clickEvent,
}) => {
  return (
    <AnimatingButton
      onClick={clickEvent}
      style={style}
      showCaret={showCaret.toString()}
    >
      {showCaret && <Caret />}
      <span>{title}</span>
    </AnimatingButton>
  );
};

const animationKey = keyframes`
    0%{transform:translateY(0)}
    25%{transform:translateY(-5px)}
    50%{transform:translateY(0)}
    75%{transform:translateY(5px)}
    100%{transform:translateY(5Ø­Ø¡)}
`;

const AnimatingButton = styled.div`
  /* position: absolute; */
  display: flex;
  align-items: center;
  padding: 6px;
  border: 1.5px solid #50b5af;
  background: ${({ showCaret }) => (showCaret === "true" ? null : "#10a37f")};
  color: ${({ showCaret }) => (showCaret === "true" ? null : "#fff")};
  filter: drop-shadow(-2px 2px 0px rgba(0, 224, 255, 0.2));
  border-radius: 5px;
  z-index: 999;
  animation-name: ${animationKey};
  animation-timing-function: linear;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  user-select: none;
  cursor: ${({ showCaret }) => (showCaret === "true" ? "default" : "pointer")};

  span {
    margin-left: ${({ showCaret }) => (showCaret === "true" ? "5px" : null)};
    font-weight: 500;
  }
`;

const Caret = styled.div`
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-right: 18px solid #50b6b0;
  border-bottom: 8px solid transparent;
`;

export default NuxButton;
