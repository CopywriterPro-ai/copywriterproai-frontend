/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Layout from '@/layout/Layout';
import Rating from '@/components/common/Rating';
import { GoogleButton, FacebookButton } from "@/components/common/AuthButton";
import { testimonialAuthor, testimonial } from '@/utils/data';

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { InputField } from "@/components/common/Form";
import {
  postUserRegister,
  selectors as authSelector,
} from "@/redux/slices/auth";
import { toastMessage } from "@/utils";
import { isServer } from "@/utils";

const baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

const handleStrategyAction = (strategy) => {
  if (!isServer) window.open(`${baseURL}/v1/auth/${strategy}`, "_self");
};

const Register = () => {
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
    <Layout title="Sign Up" description="">
      <section
        className="sign-up-in-section bg-dark ptb-60"
        style={{
          background: "url('/page-header-bg.svg')no-repeat right bottom",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12">
              <div className="pricing-content-wrap bg-custom-light rounded-custom shadow-lg">
                <div className="price-feature-col pricing-feature-info text-white left-radius p-5 order-1 order-lg-0">
                  <Link href="/">
                    <a className="mb-5 d-none d-xl-block d-lg-block">
                      <Image
                        width={226}
                        height={76}
                        src="/logo-white.svg"
                        alt="logo"
                        className="img-fluid"
                      />
                    </a>
                  </Link>
                  <div className="customer-testimonial-wrap mt-60">
                    <div className="tab-content" id="nav-tabContent">
                      {testimonial.map((testimonial, i) => (
                        <div
                          key={i + 1}
                          className={`tab-pane fade ${testimonial.active}`}
                          id={testimonial.target}
                          role="tabpanel"
                        >
                          <div className="testimonial-tab-content mb-4">
                            <div className="mb-2">
                              <ul className="review-rate mb-0 mt-2 list-unstyled list-inline">
                                <li className="list-inline-item">
                                  <Rating />
                                </li>
                              </ul>
                            </div>
                            <blockquote>
                              <h5>{testimonial.header} </h5>
                              {testimonial.description}
                            </blockquote>
                            <div className="author-info mt-4">
                              <h6 className="mb-0">{testimonial.name} </h6>
                              <span className="small">
                                {testimonial.title}{' '}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <ul
                      className="nav testimonial-tab-list mt-5"
                      id="nav-tab"
                      role="tablist"
                    >
                      {testimonialAuthor.map((testimonialTarget, i) => (
                        <li key={i + 1} className="nav-item">
                          <a
                            className={testimonialTarget.active}
                            href={testimonialTarget.target}
                            data-bs-toggle="tab"
                            data-bs-target={testimonialTarget.target}
                            role="tab"
                            aria-selected="true"
                          >
                            <img
                              src={testimonialTarget.image}
                              className="img-fluid rounded-circle"
                              width="60"
                              alt="user"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="price-feature-col pricing-action-info p-5 right-radius bg-light order-0 order-lg-1">
                  <a
                    href="index.html"
                    className="mb-4 d-block d-xl-none d-lg-none"
                  >
                    <Image
                      width={226}
                      height={76}
                      src="/logo-color.svg"
                      alt="logo"
                      className="img-fluid"
                    />
                  </a>
                  <h1 className="h3">Create an Account</h1>
                  <p className="text-muted">
                    Get started with your free account today. No credit card
                    needed and no setup fees.
                  </p>

                  <form className="mt-5 register-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="action-btns">
                      <GoogleButton
                        clickEvent={() => handleStrategyAction("google")}
                        title={"Sign up with Google"}
                      />
                      <FacebookButton
                        clickEvent={() => handleStrategyAction("facebook")}
                        title={"Sign up with Facebook"}
                      />
                    </div>
                    <div className="position-relative d-flex align-items-center justify-content-center mt-4 py-4">
                      <span className="divider-bar"></span>
                      <h6 className="position-absolute text-center divider-text bg-light mb-0">
                        Or
                      </h6>
                    </div>
                    
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="first-name" className="mb-1">
                          First Name <span className="text-danger">*</span>
                        </label>
                        <div className="mb-3">
                          <InputField
                            register={register("firstName")}
                            placeholder="First Name"
                            ariaLabel={"first-name"}
                            errors={errors}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="last-name" className="mb-1">
                          Last Name <span className="text-danger">*</span>
                        </label>
                        <div className="mb-3">
                          <InputField
                            register={register("lastName")}
                            placeholder="Last Name"
                            ariaLabel={"last-name"}
                            errors={errors}
                          />
                        </div>
                      </div>
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
                        <div className="form-check d-flex">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            I have read and agree to the{' '}
                            <Link href="/terms-of-use">
                              <a>
                                Terms of Use
                              </a>
                            </Link>
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-primary mt-4 d-block w-100"
                        >
                          Submit
                        </button>
                      </div>
                    </div>

                    <p className="text-center text-muted mt-4 mb-0 fw-medium font-monospace">
                      Already have an account?{' '}
                      <Link href="/signin">
                        <a className="text-decoration-none">Sign in</a>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().max(20).label("First Name"),
  lastName: Yup.string().required().max(20).label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export default Register;
