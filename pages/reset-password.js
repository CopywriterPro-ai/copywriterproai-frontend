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
import {
  postResetPassword,
  selectors as authSelector,
} from "@/redux/slices/auth";
import { toastMessage } from "@/utils";

const { SignForm } = FormStyles;

const AppBanner = () => {
  return <Banner SignInBgImg={SignInBgImg} className="col-md-6" />;
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = router.query;

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

  const onSubmit = ({ password }) => {
    if (token)
      dispatch(postResetPassword({ token, data: { password } })).then(
        ({ payload }) => {
          const {
            status,
            data: { message },
          } = payload;
          if (status === 200) {
            toastMessage.success(message);
            router.push("/signin");
          } else if (status >= 400) {
            toastMessage.error(message);
            formReset();
          }
        }
      );
    else {
      toastMessage.warn("Reset password token needed", 4000, {
        toastId: "token-null",
      });
    }
  };

  return (
    <Layout>
      <AuthForm
        Banner={<AppBanner />}
        title="Reset Password"
        nextTitle="Don't have an account? "
        nextLink="/signup"
        nextText="Sign up"
        strategyTitle="Sign in"
        showSignWithEmail={false}
        showStrategy={false}
        showNext={false}
        showDescription={false}
      >
        <SignForm onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="password"
            register={register("password")}
            placeholder="New Password"
            errors={errors}
          />
          <InputField
            type="password"
            register={register("password2")}
            placeholder="Confirm Password"
            errors={errors}
          />

          <SubmitButton loading={isPending} title="RESET PASSWORD" />
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
  password: Yup.string().required().min(6).label("Password"),
  password2: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default ResetPassword;
