import React from "react";
import styled from "styled-components";

const QuickAuth = () => {
  return (
    <Container>
      <Text>
        <h2>Start your journey with CopywriterPro today</h2>
        <p>Get full access to all tools for 7 days.</p>
      </Text>
      <SignUp href="/signup">Start your free trial</SignUp>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 550px;
  background: linear-gradient(86.96deg, #0E2F6C 0%, #007FFF 100%);

  @media (max-width: 1092px) {
    height: 400px;
  }

  @media (max-width: 900px) {
    height: 360px;
  }

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  width: 40rem;
  color: #D3E5FF;

  @media (max-width: 1092px) {
    width: 27rem;
  }

  @media (max-width: 900px) {
    width: 22rem;
  }

  @media (max-width: 767px) {
    width: 32rem;
    text-align: center;
  }

  @media (max-width: 560px) {
    width: 21rem;
  }

  @media (max-width: 426px) {
    width: 15rem;
  }

  h2 {
    font-weight: 800;
    font-size: 38px;
    line-height: 65px;
    margin: 0;

    @media (max-width: 1092px) {
      font-size: 30.5px;
      line-height: 55px;
    }

    @media (max-width: 900px) {
      font-size: 25px;
      line-height: 42px;
    }

    @media (max-width: 767px) {
      font-size: 22px;
    }

    @media (max-width: 426px) {
      font-size: 20px;
      line-height: 35px;
    }
  }

  p {
    font-weight: 500;
    font-size: 24.5px;
    line-height: 38px;
    margin-bottom: 0px;
    padding: 20px 0px;

    @media (max-width: 1092px) {
      font-size: 20px;
      padding-top: 10px;
    }

    @media (max-width: 900px) {
      font-size: 16px;
      padding-top: 4px;
    }

    @media (max-width: 767px) {
      font-size: 18px;
      padding-top: 0px;
    }

    @media (max-width: 426px) {
      font-size: 13px;
    }
  }
`;

const SignUp = styled.a`
  font-weight: 600;
  font-size: 21px;
  line-height: 32px;
  padding: 13px 60px;
  background: #6CE13B;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color: white;
  }

  @media (max-width: 1092px) {
    font-size: 20px;
    padding: 13px 50px;
  }

  @media (max-width: 900px) {
    font-size: 18px;
    padding: 10px 36px;
  }

  @media (max-width: 767px) {
    padding: 5px 35px;
  }

  @media (max-width: 426px) {
    font-size: 15px;
    font-weight: 500;
    padding: 5px 25px;
  }
`;

export default QuickAuth;
