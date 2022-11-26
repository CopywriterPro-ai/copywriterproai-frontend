import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/layout/Layout';

import { GoogleButton, FacebookButton } from "@/components/common/AuthButton";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { InputField } from "@/components/common/Form";
import { postUserLogin, selectors as authSelector } from "@/redux/slices/auth";
import { selectors as uiSelector } from "@/redux/slices/ui";
import { toastMessage } from "@/utils";
import { USER_DEFAULT_PATH } from "@/appconstants";
import { isServer } from "@/utils";

const baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

const handleStrategyAction = (strategy) => {
  if (!isServer) window.open(`${baseURL}/v1/auth/${strategy}`, "_self");
};

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const redirectPath = useSelector(uiSelector.getRedirectPath);

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
    <Layout title="Login" desc="This is login page">
      <section
        className="sign-up-in-section bg-dark ptb-60"
        style={{
          background: "url('/page-header-bg.svg')no-repeat right bottom",
        }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-5 col-md-8 col-12">
              <Link href="/">
                <a className="mb-5 d-xl-block d-lg-block text-center">
                  <Image
                    width={190}
                    height={64}
                    src="/logo-white.svg"
                    alt="logo"
                    className="img-fluid"
                  />
                </a>
              </Link>
              <div className="register-wrap p-5 bg-light shadow rounded-custom">
                <h1 className="h3">Welcome Back!</h1>
                <p className="text-muted">
                  Please log in to access your account web-enabled methods of
                  innovative niches.
                </p>

                <div className="action-btns">
                  <GoogleButton
                    clickEvent={() => handleStrategyAction("google")}
                    title={"Sign in with Google"}
                  />
                  <FacebookButton
                    clickEvent={() => handleStrategyAction("facebook")}
                    title={"Sign in with Facebook"}
                  />
                </div>
                <div className="position-relative d-flex align-items-center justify-content-center mt-4 py-4">
                  <span className="divider-bar"></span>
                  <h6 className="position-absolute text-center divider-text bg-light mb-0">
                    Or
                  </h6>
                </div>
                <form className="mt-4 register-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-sm-12">
                      <label htmlFor="email" className="mb-1">
                        Email <span className="text-danger">*</span>
                      </label>
                      <div className="mb-3">
                        <InputField
                          register={register("email")}
                          placeholder="Email"
                          ariaLabel={"email"}
                          errors={errors}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <label htmlFor="password" className="mb-1">
                        Password <span className="text-danger">*</span>
                      </label>
                      <div className="mb-3">
                        <InputField
                          type="password"
                          register={register("password")}
                          placeholder="Password"
                          ariaLabel={"password"}
                          errors={errors}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary mt-3 d-block w-100"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  <p className="font-monospace fw-medium text-center text-muted mt-3 pt-4 mb-0">
                    Don’t have an account?{' '}
                    <Link href="/signup">
                      <a className="text-decoration-none">Sign up Today</a>
                    </Link>
                    <br />
                    <Link href="/forgot-password">
                      <a className="text-decoration-none">Forgot password</a>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export default Login;
