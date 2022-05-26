import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { AuthLayout as Layout } from "@/layout";
import logo from "@/assets/images/copywriterpro.ai-logo.png";
import Googlelogo from "@/assets/images/Google.png";
import Facebooklogo from "@/assets/images/Facebook.png";

const Signin = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (values) => {
    alert(JSON.stringify(values));
  };

  return (
    <Layout>
      <Container>
        <FlexContainer>
          <StyledBrand>
            <StyledLogo>
              <Image
                src={logo}
                alt="copywriterpro.ai-logo"
                layout="fill"
                objectFit="contain"
              />
            </StyledLogo>
            <h4>Welcome Back</h4>
          </StyledBrand>
          <StyledStrategyAuth>
            <StyledStrategyAuthBtn>
              <Image
                src={Googlelogo}
                alt="google-auth"
                layout="fixed"
                width={25}
                height={25}
              />
              Continue with Google
            </StyledStrategyAuthBtn>
            <StyledStrategyAuthBtn>
              <Image
                src={Facebooklogo}
                alt="facebook-auth"
                layout="fixed"
                width={25}
                height={25}
              />
              Continue with Facebook
            </StyledStrategyAuthBtn>
          </StyledStrategyAuth>
          <StyledDivider>
            <p>OR</p>
          </StyledDivider>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput>
                <Input
                  {...register("email")}
                  placeholder="Email"
                  autoComplete="off"
                  type="text"
                />
                <Input
                  {...register("password")}
                  placeholder="Password"
                  autoComplete="off"
                  type="password"
                />
              </FormInput>
              <StyledCreateAccountBtn>
                <button type="submit">Log In</button>
              </StyledCreateAccountBtn>
            </form>
          </div>
          <StyledFooterBrand>
            <div>
              <Link href="/new/forgot-password">Forgot password?</Link>
            </div>
            <div>
              Don’t have an account? <Link href="/new/signup">Sign up</Link>
            </div>
          </StyledFooterBrand>
        </FlexContainer>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 300px;
  padding: 5px;
  position: relative;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

const StyledBrand = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 6rem;
  margin-top: 1rem;
  margin-bottom: 2rem;

  h4 {
    font-weight: 600;
    font-size: 25px;
  }
`;

const StyledLogo = styled.div`
  height: 40px;
  position: relative;
  width: 250px;
  margin-bottom: 2rem;
`;

const StyledStrategyAuth = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  row-gap: 1rem;
  flex-direction: column;
`;

const StyledDivider = styled.div`
  width: 100%;
  border-bottom: 1px solid #d8d8d8;
  margin: 2rem auto;
  display: flex;
  justify-content: center;

  p {
    background-color: #fff;
    color: #737373;
    margin-bottom: -12px;
    width: 30px;
    text-align: center;
    font-size: 14px;
  }
`;

const StyledStrategyAuthBtn = styled.button`
  border: 2px solid #1877f2;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  padding: 0.25rem 0;
  font-size: 14px;
  font-weight: 500;
`;

const FormInput = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 2.5rem;
`;

const Input = styled.input`
  flex: 0 0 48%;
  box-shadow: inset 0px -1.5px 0px #007fff;
  border: 0;
  outline: 0;
  height: 40px;
  background-color: #fff;
  padding: 10px;
  font-size: 14px;
`;

const StyledCreateAccountBtn = styled.div`
  display: flex;
  justify-content: center;

  button {
    margin-top: 1.8rem;
    background: #01315d;
    color: #fff;
    font-weight: 700;
    font-size: 12px;
    padding: 0.5rem 4rem;
    border: 0;
    width: 100%;
  }
`;

const StyledFooterBrand = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 1.5rem;

  div {
    margin: 0.5rem auto;
  }

  a {
    font-weight: 500;
    text-decoration: underline;
    color: #007fff;
  }
`;

export default Signin;
