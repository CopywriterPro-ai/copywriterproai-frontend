import React from "react";
import styled from "styled-components";
import Link from "next/link";

import { GoogleButton, FacebookButton } from "@/components/common/AuthButton";
import { AuthButtonGroup } from "@/components/common/AuthButton/styles";
import { useResponsive } from "@/hooks";
import { isServer } from "@/utils";
import Logo from "@/assets/images/logo-color.png";

const baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

const AuthForm = ({
  Banner,
  children,
  title,
  description,
  strategyTitle,
  nextTitle,
  nextLink,
  nextText,
  showStrategy = true,
  showSignWithEmail = true,
  showDescription = false,
  showNext = true,
}) => {
  const { isDesktop } = useResponsive();

  const handleStrategyAction = (strategy) => {
    if (!isServer) window.open(`${baseURL}/v1/auth/${strategy}`, "_self");
  };

  return (
    <div className="container-fluid">
      <Row className="row">
        {isDesktop && Banner}
        <AuthSign className="col-md-6">
          {!isDesktop && (
            <AuthHeader>
              <Link href="/" passHref>
                <BrandLogo src={Logo.src} alt="CopywriterPro.AI" />
              </Link>
            </AuthHeader>
          )}

          <h2>{title}</h2>

          {showStrategy && (
            <StrategyButton>
              <AuthButtonGroup>
                <GoogleButton
                  clickEvent={() => handleStrategyAction("google")}
                  title={`${strategyTitle} with
                Google`}
                />
              </AuthButtonGroup>
              <AuthButtonGroup>
                <FacebookButton
                  clickEvent={() => handleStrategyAction("facebook")}
                  title={`${strategyTitle} with Facebook`}
                />
              </AuthButtonGroup>
            </StrategyButton>
          )}

          {/* {showSignWithEmail && (
            <OrSignWithEmail>- or {strategyTitle} with email -</OrSignWithEmail>
          )} */}

          {showDescription && <Description>{description}</Description>}

          {children}
          {showNext && (
            <NextPage>
              {nextTitle}
              <StyledLink href={nextLink}>{nextText}</StyledLink>
            </NextPage>
          )}
        </AuthSign>
      </Row>
    </div>
  );
};

const Row = styled.div`
  /* align-items: center; */
`;

const AuthSign = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  h2 {
    margin-bottom: 10px;
    font-size: 30px;
    font-weight: 500;
    line-height: 54px;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
`;

const AuthHeader = styled.header`
  margin-bottom: 15px;
`;

const BrandLogo = styled.img`
  height: 45px;
`;

const StrategyButton = styled.div``;

const OrSignWithEmail = styled.p`
  text-transform: lowercase;
  font-size: 18px;
  font-weight: 500;
  color: #808080;
  margin: 10px 0;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  max-width: 70%;
  margin: 0 auto 20px;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const NextPage = styled.div`
  margin: 20px 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 30px;
`;

const StyledLink = styled(Link)`
  color: #3eaea8;
  &:hover {
    text-decoration: none;
  }
`;

export default AuthForm;
