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
import { strategyAction, toastMessage } from "@/utils";
import {
  postUserRegister,
  selectors as authSelector,
} from "@/redux/slices/auth";
import logo from "@/assets/images/copywriterpro.ai-logo.png";
import Googlelogo from "@/assets/images/Google.png";
import Facebooklogo from "@/assets/images/Facebook.png";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector(authSelector.getAuthenticate);
  const isPending = loading === "pending";

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    !isPending &&
      dispatch(postUserRegister({ data })).then(({ payload }) => {
        const {
          status,
          data: { message },
        } = payload;
        if (status === 201) {
          router.push("/email-verification?type=account-verify");
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
            <h4>Start Writing for Free!</h4>
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
                  {...register("firstName")}
                  placeholder="First Name"
                  autoComplete="off"
                  type="text"
                />
                <Input
                  {...register("lastName")}
                  placeholder="Last Name"
                  autoComplete="off"
                  type="text"
                />
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
                  Create Account
                </button>
              </StyledCreateAccountBtn>
            </form>
          </div>
          <StyledFooterBrand>
            <div>
              By signing up, you agree to the{" "}
              <Link href="/terms">Terms of Service</Link> and{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </div>
            <div>
              Already have an account?{" "}
              <Link href="/new/signin">
                <a style={{ color: "#007FFF" }}>Sign in</a>
              </Link>
            </div>
          </StyledFooterBrand>
        </FlexContainer>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 825px;
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
  margin-bottom: 2rem;

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
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    row-gap: 1rem;
  }
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
  border: 2px solid #4285f4;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
  width: 45%;
  height: 60px;
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 16px;
  }
`;

const FormInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 1.2rem;
  row-gap: 1.8rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 0 0 48%;
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
    margin-top: 2.5rem;
    background: #01315d;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    height: 60px;
    width: 390px;
    border: 0;
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
    color: #000;
  }
`;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().max(20).label("First Name"),
  lastName: Yup.string().required().max(20).label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export default Signup;
