import { UserLayout as Layout } from "@/layout";
import styled from "styled-components";

const Onboading = () => {
  return (
    <Layout>
      <div className="container" style={{ maxWidth: "800px" }}>
        <ColFlexStyle>
          <DescriptionStyle>
            Thank you for choosing us to write your SEO-friendly blog posts and
            marketing copywriting. While you are welcome to use your own OpenAI
            API key, we would greatly appreciate it if you use our Al model and
            subscribe to our package. Your support helps us continue to develop
            open-source software and drive our community. Thank you for your
            support! Happy Copywriting with CopywriterPro
          </DescriptionStyle>
          <ColFlexStyle>
            <APIKeyStyle>
              <div>OpneAl API Key:</div>
              <input name="openai-api" type="text" placeholder="Enter key" />
            </APIKeyStyle>
            <div style={{ margin: "5px 0" }}>
              <ActionBtn>Save</ActionBtn>
            </div>
          </ColFlexStyle>
          <div style={{ marginTop: "80px" }}>
            <ActionBtn TextColor="white" BgColor="green">
              Skip, start free trail
            </ActionBtn>
          </div>
        </ColFlexStyle>
      </div>
    </Layout>
  );
};

const ColFlexStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DescriptionStyle = styled.div`
  margin: 25px 0;
  border-radius: 8px;
  padding: 8px 20px;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px,
    rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
`;

const APIKeyStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  input {
    border: 1px solid gray;
    border-radius: 8px;
    padding: 5px 5px;
    min-width: 400px;
  }
`;

const ActionBtn = styled.div`
  align-items: center;
  border-radius: 8px;
  border: 1px solid gray;
  cursor: pointer;
  display: inline-flex;
  gap: 6px;
  justify-items: center;
  padding: 8px 20px;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background: ${({ BgColor }) => (BgColor ? BgColor : "white")};
  color: ${({ TextColor }) => (TextColor ? TextColor : "black")};
`;

export default Onboading;
