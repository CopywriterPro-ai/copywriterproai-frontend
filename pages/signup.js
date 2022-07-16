import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";

import { AuthLayout as Layout } from "@/layout";
import {
  InputField,
  SubmitButton,
  AuthForm,
  FormStyles,
} from "@/components/common/Form";
import {
  postUserRegister,
  selectors as authSelector,
} from "@/redux/slices/auth";
import { toastMessage } from "@/utils";
import SignupCarousel from "@/components/SingupCarousel";

const { SignForm } = FormStyles;

const AppBanner = () => {
  return (
    <Banner className="col-md-6">
      <SignupCarousel />
    </Banner>
  );
};

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector(authSelector.getAuthenticate);
  const isPending = loading === "pending";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
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
      <AuthForm
        Banner={<AppBanner />}
        title="Start Copywriting For Free!"
        nextTitle="Already have an account? "
        nextText="Sign in"
        nextLink="/signin"
        strategyTitle="Sign up"
      >
        {/* <SignForm onSubmit={handleSubmit(onSubmit)}>
          <InputField
            register={register("firstName")}
            placeholder="First Name"
            errors={errors}
          />
          <InputField
            register={register("lastName")}
            placeholder="Last Name"
            errors={errors}
          />
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
          <SubmitButton loading={isPending} title="SIGN UP" />
        </SignForm> */}
      </AuthForm>
    </Layout>
  );
};

const Banner = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background: #304c55;
  border: 12px solid #8d9486;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().max(20).label("First Name"),
  lastName: Yup.string().required().max(20).label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export default SignUp;
