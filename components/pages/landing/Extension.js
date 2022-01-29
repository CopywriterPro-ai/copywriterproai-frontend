import React from "react";
import styled from "styled-components";

import ChromeIcon from "@/assets/images/landing/extension/chrome-48.png";
import FirefoxIcon from "@/assets/images/landing/extension/firefox-48.png";
import { useResponsive } from "@/hooks";

const Extension = () => {
  const { isDesktop } = useResponsive();

  if (isDesktop) {
    return (
      <Container>
        <Title>Unleash Your Writing Power. Now Available on</Title>
        <Link href="#" target="_blank">
          <IconImg src={ChromeIcon.src} />
        </Link>
        <Link href="#" target="_blank">
          <IconImg src={FirefoxIcon.src} />
        </Link>
      </Container>
    );
  }
  return null;
};

const Container = styled.div`
  align-items: center;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(50, 85, 97, 0.95) 0%,
    rgba(50, 85, 97, 0.86) 100%
  );
  display: flex;
  height: 150px;
  justify-content: center;
  margin: 50px 0;
`;

const Title = styled.p`
  color: white;
  margin: 0;
  font-family: Simonetta;
  font-style: normal;
  font-weight: 900;
  font-size: 22px;
`;

const Link = styled.a`
  margin-left: 15px;
`;

const IconImg = styled.img`
  height: 32px;
`;

export default Extension;
