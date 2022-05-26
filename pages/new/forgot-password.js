import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { AuthLayout as Layout } from "@/layout";
import logo from "@/assets/images/copywriterpro.ai-logo.png";

const Forgotpassword = () => {
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
            <h4>Reset your password</h4>
          </StyledBrand>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput>
                <Input
                  {...register("email")}
                  placeholder="Email"
                  autoComplete="off"
                  type="text"
                />
              </FormInput>
              <StyledCreateAccountBtn>
                <button type="submit">Send Link</button>
              </StyledCreateAccountBtn>
            </form>
          </div>
          <StyledFooterBrand>
            <Link href="/new/signin">Back to Log in</Link>
            <Link href="/new/signup">Sign up Instead</Link>
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
    width: 100%;
    margin-top: 1.8rem;
    background: #01315d;
    color: #fff;
    font-weight: 700;
    font-size: 12px;
    padding: 0.5rem 4rem;
    border: 0;
  }
`;

const StyledFooterBrand = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 1.5rem;

  a {
    font-weight: 500;
    text-decoration: underline;
    color: #007fff;
  }
`;

export default Forgotpassword;
