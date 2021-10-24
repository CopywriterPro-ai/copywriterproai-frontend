import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";

import { AuthLayout as Layout } from "@/layout";
import SignInBgImg from "assets/images/signinbg.png";
import {
  InputField,
  SubmitButton,
  AuthForm,
  FormStyles,
} from "@/components/common/Form";
import {
  postForgotPassword,
  selectors as authSelector,
} from "@/redux/slices/auth";
import { toastMessage } from "@/utils";

const { SignForm } = FormStyles;

const AppBanner = () => {
  return <Banner SignInBgImg={SignInBgImg} className="col-md-6" />;
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector(authSelector.getAuthenticate);
  const isPending = loading === "pending";

  const {
    register,
    handleSubmit,
    reset: formReset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
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
      <AuthForm
        Banner={<AppBanner />}
        title="Forgot Your Password?"
        description="Enter your email and we will send you a
      link to reset your password"
        nextTitle="Back to "
        nextLink="/signin"
        nextText="Sign in"
        strategyTitle="Sign in"
        showStrategy={false}
        showSignWithEmail={false}
        showDescription={true}
      >
        <SignForm onSubmit={handleSubmit(onSubmit)}>
          <InputField
            register={register("email")}
            placeholder="Email"
            errors={errors}
          />
          <SubmitButton loading={isPending} title="SUBMIT" />
        </SignForm>
      </AuthForm>
    </Layout>
  );
};

const Banner = styled.div`
  background-color: #304c55;
  background-image: ${({ SignInBgImg }) => `url(${SignInBgImg.src})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
`;

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

export default ForgotPassword;
