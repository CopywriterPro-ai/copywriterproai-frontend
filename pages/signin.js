import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";

import { AuthLayout as Layout } from "@/layout";
import SignInBgImg from "@/assets/images/signinbg.png";
import {
  InputField,
  SubmitButton,
  AuthForm,
  FormStyles,
} from "@/components/common/Form";
import { postUserLogin, selectors as authSelector } from "@/redux/slices/auth";
import { selectors as uiSelector } from "@/redux/slices/ui";
import { toastMessage } from "@/utils";
import { USER_DEFAULT_PATH } from "@/appconstants";

const { SignForm, Forgot, ForgotLink } = FormStyles;

const AppBanner = () => {
  return <Banner SignInBgImg={SignInBgImg} className="col-md-6" />;
};

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector(authSelector.getAuthenticate);
  const redirectPath = useSelector(uiSelector.getRedirectPath);
  const isPending = loading === "pending";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
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
      <AuthForm
        Banner={<AppBanner />}
        title="Sign in to CopywriterPro"
        nextTitle="Don’t have an account? "
        nextLink="/signup"
        nextText="Sign up"
        strategyTitle="Sign in"
      >
        <SignForm onSubmit={handleSubmit(onSubmit)}>
          <InputField
            register={register("email")}
            placeholder="Email"
            errors={errors}
          />
          <InputField
            type="password"
            register={register("password")}
            placeholder="Password"
            errors={errors}
          />
          <Forgot>
            <ForgotLink href="/forgot-password">
              Forgot your password
            </ForgotLink>
          </Forgot>
          <SubmitButton loading={isPending} title="SIGN IN" />
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
  password: Yup.string().required().min(6).label("Password"),
});

export default SignIn;
