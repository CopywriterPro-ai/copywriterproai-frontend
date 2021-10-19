import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = ({ size = "100px", style }) => {
  return <SpinLoader style={{ width: size, height: size, ...style }} />;
};

const Spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinLoader = styled.div`
  border: 10px solid #f3f3f3;
  border-radius: 50%;
  border-top: 10px solid #14557b;
  animation: ${Spin} 0.8s linear infinite;
`;

export default Loader;
