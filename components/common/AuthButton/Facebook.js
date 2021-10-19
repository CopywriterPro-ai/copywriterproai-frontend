import React from "react";
import styled from "styled-components";

import FacebookIcon from "@/assets/images/landing/facebook-auth-no-background.png";
import { AuthButton } from "./styles";

const Facebook = ({ title, clickEvent }) => {
  return (
    <FacebookButton onClick={clickEvent}>
      <Image src={FacebookIcon.src} alt="facebook" />
      {title}
    </FacebookButton>
  );
};

const FacebookButton = styled(AuthButton)`
  background: linear-gradient(
    91.14deg,
    rgba(131, 174, 215, 0.12) 0%,
    rgba(199, 223, 245, 0.29) 100%
  );
`;

const Image = styled.img`
  width: 26px;
  margin: 0px 8px;
`;

export default Facebook;
