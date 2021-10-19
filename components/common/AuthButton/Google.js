import React from "react";
import styled from "styled-components";

import GoogleIcon from "@/assets/images/landing/google-auth-no-background.png";
import { AuthButton } from "./styles";

const Google = ({ title, clickEvent }) => {
  return (
    <GoogleButton onClick={clickEvent}>
      <Image src={GoogleIcon.src} alt="google" />
      {title}
    </GoogleButton>
  );
};

const GoogleButton = styled(AuthButton)`
  background: linear-gradient(
    91.04deg,
    rgba(131, 215, 184, 0.15) 1.36%,
    rgba(131, 215, 184, 0.19) 99.82%
  );
`;

const Image = styled.img`
  width: 26px;
  margin: 0px 8px;
`;

export default Google;
