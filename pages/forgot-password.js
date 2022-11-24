import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/layout/Layout';

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { InputField } from "@/components/common/Form";
import {
  postForgotPassword,
  selectors as authSelector,
} from "@/redux/slices/auth";
import { toastMessage } from "@/utils";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector(authSelector.getAuthenticate);

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
    <Layout title="Password Reset" desc="This is password reset page">
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
                <a className="mb-4 d-block text-center">
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
                <h1 className="fw-bold h3">Forgot your Password?</h1>
                <p className="text-muted">
                  Don&apos;t worry. Enter your email and we will send you a link to reset your password.
                </p>
                <form className="mt-5 register-form" onSubmit={handleSubmit(onSubmit)}>
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
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary mt-3 d-block w-100"
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>
                  <p className="font-monospace fw-medium text-center mt-3 pt-4 mb-0">
                    <Link href="/signin">
                      <a className="text-decoration-none">Back to login page</a>
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
});

export default ForgotPassword;
