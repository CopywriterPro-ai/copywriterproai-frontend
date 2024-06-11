import Modal from "react-modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

import { setSigninModal, selectors as uiSelector } from "@/redux/slices/ui";
import GoogleIcon from "@/assets/images/landing/quick-auth/google.png";
import FacebookIcon from "@/assets/images/landing/quick-auth/facebook.png";
import {
  postUserLogin,
  postUserRegister,
  selectors as authSelector,
} from "@/redux/slices/auth";
import { toastMessage } from "@/utils";
import { USER_DEFAULT_PATH } from "@/appconstants";

const baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

const AuthButton = ({ children, Icon, Strategy }) => {
  const handleStrategyAction = (strategy) => {
    window.open(`${baseURL}/v1/auth/${strategy}`, "_self");
  };

  return (
    <Button onClick={() => handleStrategyAction(Strategy)}>
      <StrategyImg src={Icon.src} alt={children} />
      {children}
    </Button>
  );
};

const Button = styled.button`
  background-color: #fff;
  border-radius: 60px;
  border: 2px solid #000000;
  height: 50px;
  width: 225px;
  font-weight: 500;
  font-size: 22px;
  line-height: 37px;

  @media (max-width: 1200px) {
    font-size: 20px;
    height: 60px;
    width: 205px;
  }

  @media (max-width: 992px) {
    font-size: 18px;
    height: 52px;
    width: 175px;
  }

  @media (max-width: 535px) {
    font-size: 16px;
    height: 48px;
    width: 170px;
  }

  @media (max-width: 425px) {
    font-size: 15px;
    height: 45px;
    width: 145px;
  }

  @media (max-width: 375px) {
    font-size: 14px;
    height: 42px;
    width: 130px;
  }

  @media (max-width: 319px) {
    font-size: 12px;
    height: 40px;
    width: 210px;
    margin: 12px 0px;
  }
`;

const StrategyImg = styled.img`
  height: 35px;
  margin-right: 10px;
  vertical-align: middle;

  @media (max-width: 1200px) {
    height: 30px;
    margin-right: 8px;
  }

  @media (max-width: 535px) {
    height: 24px;
  }

  @media (max-width: 375px) {
    height: 20px;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#FFECCF",
    border: "2px solid #000000",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  overlay: { zIndex: 99999 },
};

const Signin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [authTab, setAuthTab] = useState(0);
  const { loading } = useSelector(authSelector.getAuthenticate);
  const isPending = loading === "pending";
  const redirectPath = router.pathname || USER_DEFAULT_PATH;

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onLoginSubmit = (data) => {
    dispatch(postUserLogin({ data })).then(({ payload }) => {
      const {
        status,
        data: { message },
      } = payload;
      if (status === 200) {
        router.push(redirectPath);
      } else if (status >= 400) {
        toastMessage.error(message);
      }
    });
  };

  const onRegisterSubmit = (data) => {
    data = { ...data, firstName: "Guest", lastName: "User" };
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

  const {
    auth: { signin: modalIsOpen },
  } = useSelector(uiSelector.getModal);

  function closeModal() {
    dispatch(setSigninModal(false));
  }

  const handleAuthTab = (tab) => {
    setAuthTab(tab);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Sign in"
    >
      <Container>
        <p style={{ margin: "15px" }}>
          Craft contents that can boost your business growth
        </p>

        <AuthTab>
          <AuthTabItem
            IsSelect={authTab === 0 ? "active" : "inactive"}
            onClick={() => handleAuthTab(0)}
          >
            Sign Up
          </AuthTabItem>
          <span style={{ margin: "0 5px" }}> / </span>
          <AuthTabItem
            IsSelect={authTab === 1 ? "active" : "inactive"}
            onClick={() => handleAuthTab(1)}
          >
            Sign In
          </AuthTabItem>
        </AuthTab>

        <Auth>
          <AuthButton Icon={GoogleIcon} Strategy="google">
            Google
          </AuthButton>
          <AuthButton Icon={FacebookIcon} Strategy="facebook">
            Facebook
          </AuthButton>
        </Auth>
        <p>-- or --</p>
        {authTab === 1 && (
          <AuthForm onSubmit={handleSubmit(onLoginSubmit)}>
            <InputGroup>
              <Input type="text" {...register("email")} placeholder="Email" />
              <Input
                type="password"
                {...register("password")}
                placeholder="Password"
              />
            </InputGroup>
            <FlexBreak />
            <Button
              disabled={isPending}
              style={{ marginTop: "30px", width: "200px" }}
            >
              Start
            </Button>
          </AuthForm>
        )}
        {authTab === 0 && (
          <AuthForm onSubmit={handleSubmit(onRegisterSubmit)}>
            <InputGroup>
              <Input type="text" {...register("email")} placeholder="Email" />
              <Input
                type="password"
                {...register("password")}
                placeholder="Password"
              />
            </InputGroup>
            <FlexBreak />
            <Button
              disabled={isPending}
              style={{ marginTop: "30px", width: "200px" }}
            >
              Start
            </Button>
          </AuthForm>
        )}
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem 0;

  p {
    font-size: 20px;
    margin-bottom: 0px;
    padding: 15px 0px;
  }
`;

const FlexBreak = styled.div`
  flex-basis: 100%;
  height: 0;
`;

const AuthTab = styled.div`
  display: flex;
  margin-bottom: 1.6rem;
`;

const AuthTabItem = styled.span`
  cursor: pointer;
  font-weight: 500;
  padding-bottom: 1px;
  border-bottom: ${({ IsSelect }) =>
    IsSelect === "active" ? "1.5px solid black" : "none"};
`;

const Auth = styled.div`
  display: flex;
  justify-content: space-between;
  width: 495px;

  @media (max-width: 1200px) {
    width: 445px;
  }

  @media (max-width: 992px) {
    width: 390px;
  }

  @media (max-width: 767px) {
    // display: contents;
  }

  @media (max-width: 535px) {
    width: 369px;
  }

  @media (max-width: 425px) {
    width: 319px;
  }

  @media (max-width: 375px) {
    width: 282px;
  }

  @media (max-width: 319px) {
    width: 210px;
    display: block;
  }
`;

const AuthForm = styled.form`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 717px;

  @media (max-width: 1200px) {
    width: 677px;
  }

  @media (max-width: 992px) {
    width: 640px;
  }

  @media (max-width: 767px) {
    display: contents;
  }
`;

const Input = styled.input`
  border: 2px solid #000000;
  border-radius: 60px;
  height: 50px;
  width: 335px;
  outline: none;
  padding: 0 25px;
  font-size: 22px;

  @media (max-width: 1200px) {
    width: 320px;
    font-size: 18px;
  }

  @media (max-width: 992px) {
    height: 52px;
    width: 395px;
    font-size: 16px;
    margin: 12px;
  }

  @media (max-width: 535px) {
    height: 48px;
    width: 370px;
  }

  @media (max-width: 425px) {
    height: 48px;
    width: 320px;
  }

  @media (max-width: 375px) {
    height: 45px;
    width: 281px;
    font-size: 14px;
  }

  @media (max-width: 319px) {
    height: 40px;
    width: 210px;
    font-size: 12px;
    padding: 0 20px;
  }
`;

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export default Signin;
