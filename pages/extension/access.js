import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { extensionAccessToken } from "redux/slices/user";
import { SpecialLayout as Layout } from "@/layout";
import { useUser, useUAParser } from "@/hooks";
import { toastMessage } from "@/utils";

const REDIRECT_SECONDS = 5;
const extensionId = process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID;

const AccessToken = () => {
  const dispatch = useDispatch();
  const [authSuccess, setAuthSuccess] = useState(false);
  const [count, setCount] = useState(REDIRECT_SECONDS);
  const { success: uaSuccess, parser } = useUAParser();
  const { isAuth } = useUser();

  const { browser } = parser;

  useEffect(() => {
    if (authSuccess)
      setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
  }, [authSuccess]);

  useEffect(() => {
    if (isAuth)
      dispatch(extensionAccessToken()).then(({ payload }) => {
        if (payload.status === 200 && uaSuccess) {
          try {
            if (browser?.name === "Chrome" && chrome && chrome.runtime) {
              chrome.runtime.sendMessage(
                extensionId,
                {
                  type: "AccessToken",
                  payload: {
                    ...payload.data,
                    tabCloseSeconds: REDIRECT_SECONDS,
                  },
                },
                (response) => {
                  if (response?.success) {
                    setAuthSuccess(true);
                  }
                }
              );
            }
            if (browser?.name === "Firefox" && window && window.postMessage) {
              window.postMessage(
                {
                  type: "AccessToken",
                  ...payload.data,
                  tabCloseSeconds: REDIRECT_SECONDS,
                },
                "*"
              );
            }
          } catch (error) {
            console.log("error", error);
          }
        } else {
          toastMessage.warn("Something went wrong...");
        }
      });
  }, [browser?.name, dispatch, isAuth, uaSuccess]);

  useEffect(() => {
    if (uaSuccess && browser?.name === "Firefox") {
      window.addEventListener("message", (event) => {
        if (event.source === window && event.data && event.data.success) {
          setAuthSuccess(event.data.success);
        }
      });
    }
  }, [browser?.name, uaSuccess]);

  return (
    <Layout>
      <AuthContainer>
        {isAuth && (
          <>
            {authSuccess && (
              <div style={{ textAlign: "center" }}>
                <h4>Extension successfully authenticated</h4>
                <p>
                  Automatically close tab, after {count >= 0 ? count : 0}{" "}
                  seconds
                </p>
              </div>
            )}
            {!authSuccess && <h4>Authenticating...</h4>}
          </>
        )}
        {!isAuth && (
          <h4>
            Please <SignIn href="/signin">Sign in</SignIn> first, and try again{" "}
          </h4>
        )}
      </AuthContainer>
    </Layout>
  );
};

const AuthContainer = styled.div`
  display: flex;
  min-height: 40vh;
  justify-content: center;
  align-items: center;
`;

const SignIn = styled(Link)`
  text-decoration: underline;
  color: #6c6c6c;
`;

export default AccessToken;
