import React from "react";
import * as Yup from "yup";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import GoogleIcon from "@/assets/images/landing/quick-auth/google.png";
import FacebookIcon from "@/assets/images/landing/quick-auth/facebook.png";
import {
  postUserRegister,
  selectors as authSelector,
} from "@/redux/slices/auth";
import { toastMessage } from "@/utils";
import { isServer } from "@/utils";

const baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

const AuthButton = ({ children, Icon, Strategy }) => {
  const handleStrategyAction = (strategy) => {
    !isServer && window.open(`${baseURL}/v1/auth/${strategy}`, "_self");
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
  height: 60px;
  width: 230px;
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

const QuickAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector(authSelector.getAuthenticate);
  const isPending = loading === "pending";

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
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

  return (
    <Container>
      <h2>Craft contents that can boost your business growth</h2>
      <p style={{ margin: "15px" }}>Try it now!</p>
      <Auth>
        <AuthButton Icon={GoogleIcon} Strategy="google">
          Google
        </AuthButton>
        <AuthButton Icon={FacebookIcon} Strategy="facebook">
          Facebook
        </AuthButton>
      </Auth>
      <p>-- or --</p>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
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
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 743px;

  background: rgba(255, 236, 207, 0.85);
  border-top: 3px solid #000000;
  border-bottom: 3px solid #000000;

  h2 {
    font-weight: 500;
    font-size: 35px;
    line-height: 55px;
    margin: 0;

    @media (max-width: 1200px) {
      font-size: 34px;
    }

    @media (max-width: 992px) {
      font-size: 32px;
      text-align: center;
      margin: 0 115px;
    }

    @media (max-width: 767px) {
      font-size: 29px;
      text-align: center;
      margin: 0 60px;
    }

    @media (max-width: 535px) {
      font-size: 25px;
      text-align: center;
      margin: 0 15px;
    }

    @media (max-width: 425px) {
      font-size: 22px;
      line-height: 45px;
    }

    @media (max-width: 375px) {
      font-size: 19px;
      line-height: 40px;
    }

    @media (max-width: 319px) {
      font-size: 17px;
      line-height: 35px;
      margin: 0 20px;
    }

    @media (max-width: 280px) {
      font-size: 15px;
    }
  }

  p {
    font-weight: 500;
    font-size: 30px;
    line-height: 48px;
    margin-bottom: 0px;
    padding: 20px 0px;

    @media (max-width: 1200px) {
      font-size: 29px;
    }

    @media (max-width: 992px) {
      font-size: 25px;
      margin: 0;
    }

    @media (max-width: 767px) {
      font-size: 25px;
    }

    @media (max-width: 535px) {
      font-size: 20px;
    }

    @media (max-width: 425px) {
      font-size: 20px;
    }

    @media (max-width: 375px) {
      font-size: 18px;
      padding: 10px 0px;
    }

    @media (max-width: 319px) {
      font-size: 16px;
      padding: 0;
    }

    @media (max-width: 280px) {
      font-size: 14px;
    }
  }
`;

const FlexBreak = styled.div`
  flex-basis: 100%;
  height: 0;
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
  height: 60px;
  width: 340px;
  outline: none;
  padding: 0 30px;
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

export default QuickAuth;
