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
import {
  postForgotPassword,
  selectors as authSelector,
} from "@/redux/slices/auth";
import { toastMessage } from "@/utils";
import logo from "@/assets/images/copywriterpro.ai-logo.png";

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector(authSelector.getAuthenticate);
  const isPending = loading === "pending";

  const {
    register,
    handleSubmit,
    reset: formReset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    !isPending &&
      dispatch(postForgotPassword({ data })).then(({ payload }) => {
        const {
          status,
          data: { message },
        } = payload;
        if (status === 200) {
          router.push("/email-verification?type=forgot-password");
        } else if (status >= 400) {
          toastMessage.error(message);
          formReset();
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
            <h4>Reset your password</h4>
            <p>
              Enter your email and we will send you a link to reset your
              password.
            </p>
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
                <button disabled={isPending} type="submit">
                  Send Link
                </button>
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
  margin-bottom: 2rem;

  h4 {
    font-weight: 600;
    font-size: 32px;
    font-family: "Poppins";
  }

  p {
    text-align: center;
    font-size: 18px;
    margin: 1rem auto;
    max-width: 80%;
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
  height: 60px;
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
    font-size: 16px;
    height: 60px;
    border: 0;
  }
`;

const StyledFooterBrand = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-top: 1.5rem;

  a {
    font-weight: 500;
    text-decoration: underline;
    color: #007fff;
  }
`;

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

export default Forgotpassword;
