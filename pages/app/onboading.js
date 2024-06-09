import { USER_DEFAULT_PATH } from "@/appconstants";
import { UserLayout as Layout } from "@/layout";
import {
  selectors as authSelector,
  completeOnboarding,
  submitOpenAIApi,
} from "@/redux/slices/auth";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { darken } from "polished";
import { FaKey, FaSmile } from 'react-icons/fa';
import PageHeader from '@/components/common/PageHeader';
import Footer from "@/layout/Footer/Footer";  // Importing PageHeader

const Onboarding = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { info: { loading = "idle", data: { hasCompletedOnboarding = false } = {} } = {} } = useSelector(authSelector.getAuth);

  const [apiKey, setApiKey] = useState("");
  const [aiModel, setAiModel] = useState("");
  const isLoading = loading === "pending";

  const isValidApiKey = useMemo(() => {
    return typeof apiKey === "string" && apiKey.length > 20 && apiKey.startsWith("sk-");
  }, [apiKey]);

  const handleCompleteOnboarding = () => {
    dispatch(completeOnboarding());
  };

  const handleSubmitAPI = () => {
    if (isValidApiKey && !isLoading) {
      dispatch(submitOpenAIApi({ ownOpenAIApiKey: apiKey }));
    }
  };

  useEffect(() => {
    if (hasCompletedOnboarding) {
      router.push(USER_DEFAULT_PATH);
    }
  }, [hasCompletedOnboarding, router]);

  return (
      <Layout type="centered">
        <PageHeader
            title="Welcome to CopywriterPro"
            description="Thank you for choosing us. Complete the onboarding to start using our services."
        />
        <Content>
          <Container>
            <ColFlex>
              <Description>
                Thank you for choosing us to write your <b>SEO-friendly</b> blog posts and marketing copywriting. While you are welcome to use your own OpenAI API key, we would greatly appreciate it if you use our AI model and subscribe to our package. Your support helps us continue to develop <b>open-source</b> software and drive our community. Thank you for your support! <b>Happy Copywriting</b> with CopywriterPro <FaSmile />.
              </Description>
              <ColFlex>
                <FormField>
                  <label>Choose AI Model:</label>
                  <select value={aiModel} onChange={(e) => setAiModel(e.target.value)}>
                    <option value="">Select AI Model</option>
                    <option value="openai">OpenAI</option>
                    <option value="google-gemini">Google Gemini AI</option>
                    <option value="other">Other AI Models</option>
                  </select>
                </FormField>
                <FormField>
                  <label>OpenAI API Key: <FaKey /></label>
                  <input
                      name="openai-api"
                      value={apiKey}
                      onChange={(ev) => setApiKey(ev.target.value)}
                      type="text"
                      placeholder="Enter key"
                  />
                </FormField>
                <ActionWrapper>
                  <ActionBtn
                      disabled={!isValidApiKey || isLoading}
                      onClick={handleSubmitAPI}
                  >
                    Save
                  </ActionBtn>
                </ActionWrapper>
              </ColFlex>
              <ActionWrapper>
                <ActionBtn
                    onClick={handleCompleteOnboarding}
                    bgColor="green"
                    textColor="white"
                >
                  Skip, start free trial
                </ActionBtn>
              </ActionWrapper>
            </ColFlex>
          </Container>
        </Content>
        <Footer />
      </Layout>
  );
};

const Content = styled.div`
  flex: 1;
  overflow-y: auto; /* Ensure scrolling */
  padding: 20px;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ColFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Description = styled.div`
  margin: 25px 0;
  border-radius: 8px;
  padding: 15px;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
  text-align: center;
  border: 2px solid #d1d1d1;
  background-color: #f9f9f9;
  font-size: 18px; /* Increased font size */
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  width: 100%;

  label {
    margin-bottom: 5px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  select, input {
    border: 1px solid gray;
    border-radius: 8px;
    padding: 10px;
    width: 100%;
    font-size: 16px;
    max-width: 100%;
  }

  input {
    min-width: 300px; /* Ensure the input is wider on larger screens */
    @media (min-width: 600px) {
      min-width: 400px;
    }
  }
`;

const ActionWrapper = styled.div`
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ActionBtn = styled.button`
  align-items: center;
  border-radius: 8px;
  border: 1px solid gray;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: inline-flex;
  gap: 6px;
  justify-content: center;
  padding: 10px 20px;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background: ${({ bgColor, disabled }) => (disabled ? "#ccc" : bgColor ? bgColor : "#007bff")};
  color: ${({ textColor }) => (textColor ? textColor : "white")};
  font-size: 16px;
  transition: background 0.3s ease;
  width: 100%;
  max-width: 200px;

  &:hover {
    background: ${({ bgColor, disabled }) => !disabled && (bgColor ? darken(0.1, bgColor) : "#0056b3")};
  }
`;

export default Onboarding;
