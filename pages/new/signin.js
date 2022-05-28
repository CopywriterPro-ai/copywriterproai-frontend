import * as Yup from "yup";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { AuthLayout as Layout } from "@/layout";
import { postUserLogin, selectors as authSelector } from "@/redux/slices/auth";
import { selectors as uiSelector } from "@/redux/slices/ui";
import { strategyAction, toastMessage } from "@/utils";
import { USER_DEFAULT_PATH } from "@/appconstants";
import logo from "@/assets/images/copywriterpro.ai-logo.png";
import Googlelogo from "@/assets/images/Google.png";
import Facebooklogo from "@/assets/images/Facebook.png";

const Signin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector(authSelector.getAuthenticate);
  const redirectPath = useSelector(uiSelector.getRedirectPath);
  const isPending = loading === "pending";

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    !isPending &&
      dispatch(postUserLogin({ data })).then(({ payload }) => {
        const {
          status,
          data: { message },
        } = payload;
        if (status === 200) {
          if (redirectPath) {
            router.push(redirectPath);
          } else {
            router.push(USER_DEFAULT_PATH);
          }
        } else if (status >= 400) {
          toastMessage.error(message);
        }
      });
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
            <StyledStrategyAuthBtn onClick={() => strategyAction("google")}>
              <Image
                src={Googlelogo}
                alt="google-auth"
                layout="fixed"
                width={25}
                height={25}
              />
              Continue with Google
            </StyledStrategyAuthBtn>
            <StyledStrategyAuthBtn onClick={() => strategyAction("facebook")}>
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
                <button disabled={isPending} type="submit">
                  Log In
                </button>
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
  max-width: 410px;
  padding: 25px;
  position: relative;
  font-family: "Montserrat";
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
  margin-top: 1rem;
  margin-bottom: 1.5rem;

  h4 {
    margin: 2rem auto;
    font-weight: 700;
    font-size: 6vw;
    font-family: "Poppins";

    @media (min-width: 768px) {
      font-size: 38px;
    }
  }
`;

const StyledLogo = styled.div`
  height: 40px;
  position: relative;
  width: 250px;
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
  justify-content: center;
  column-gap: 1rem;
  width: 100%;
  height: 60px;
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  box-shadow: inset 0px -1.5px 0px #007fff;
  border: 0;
  outline: 0;
  height: 60px;
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
    font-size: 16px;
    height: 60px;
    border: 0;
    width: 100%;
  }
`;

const StyledFooterBrand = styled.div`
  text-align: center;
  font-size: 16px;
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

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export default Signin;
