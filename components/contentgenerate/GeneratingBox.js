import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UncontrolledTooltip } from "reactstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

import {
  postGenerateContents,
  resetGeneratedContentsState,
  selectors as contentSelector,
} from "@/redux/slices/content";
import {
  setSigninModal,
  setContentSidebar,
  setAccessTask,
} from "@/redux/slices/ui";
import Processing from "@/pages/Loading";
import Spinner from "@/components/common/Spinner";
import GenerateResult from "./GenerateResult";
import TipsImg from "@/assets/images/generate-tips.png";
import { useUser, useSubscriberModal, useToolAccess } from "@/hooks";
import toolsvalidation from "@/data/toolsvalidation";
import { isActionAllowed } from "redux-state-sync";
import { FaBars } from "react-icons/fa";

const InputGeneratingBox = ({ showTutorialState }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isToolFetched = useSelector(contentSelector.getformContentsIsOk());
  const formContent = useSelector(contentSelector.getCurrentActiveTool());
  const activeKey = useSelector(contentSelector.getCurrentActiveKey());
  const { loading, content } = useSelector(
    contentSelector.getGeneratedContents()
  );
  const [defaultInput, setDefaultInput] = useState({});
  const [queryTool, setQueryTool] = useState(null);
  const isToolAvailable = useSelector(contentSelector.isHasTool(queryTool));
  const {
    isRehydrated,
    isAuth,
    subscribe: {
      freeTrial: { eligible: freeTrailEligible },
      activeSubscription: { words, subscription },
    },
  } = useUser();
  const setShowTutorial = showTutorialState[1];
  const [accessTask] = useToolAccess([queryTool]);
  const [showSubscriberModal, setShowSubscriberModal] = useSubscriberModal();

  const { contentTexts } = content;
  const { isReady, query } = router;

  const { register, handleSubmit, reset, watch } = useForm();

  const watching = watch();

  useEffect(() => {
    if (isReady) {
      setQueryTool(query.task);
    }
  }, [isReady, query.task]);

  useEffect(() => {
    let size = Object.values(watching).length;
    if (size !== 0) {
      const payload = { key: activeKey, input: watching };
      localStorage.setItem("cwp-input", JSON.stringify(payload));
    }
  }, [activeKey, watching]);

  useEffect(() => {
    const getInput = localStorage.getItem("cwp-input");
    setDefaultInput(JSON.parse(getInput));
  }, []);

  useEffect(() => {
    if (activeKey) reset();
  }, [activeKey, reset]);

  useEffect(() => {
    if (activeKey) dispatch(resetGeneratedContentsState());
  }, [activeKey, dispatch]);

  const handleSubscriberModalOpen = (message) => {
    setShowSubscriberModal({ ...showSubscriberModal, isOpen: true, message });
  };

  const validationSchema = useMemo(() => {
    if (activeKey) {
      return toolsvalidation(activeKey, subscription === "Freemium");
    } else {
      return {};
    }
  }, [activeKey, subscription]);

  const onSubmit = (formData) => {
    const task = activeKey;
    const data = { ...formData, task };

    if (!isAuth) {
      dispatch(setSigninModal(true));
      return;
    }

    if (showSubscriberModal.block) {
      setShowSubscriberModal({ ...showSubscriberModal, isOpen: true });
      return;
    }

    if (!accessTask) {
      dispatch(
        setAccessTask({ isOpen: true, message: "Upgrade Your Plan" })
      );
      return;
    }

    dispatch(postGenerateContents({ data, task }));
  };

  const handleSidebar = () => {
    dispatch(setContentSidebar(true));
  };

  const isLoading = loading === "pending";
  let isCurrentInput = defaultInput?.key === activeKey;

  if (!isToolFetched) {
    return <Processing color="#000" />;
  }

  if (!formContent) {
    return (
      <EmptyTool>
        <h4>Please Create Tool and Tool Category</h4>
      </EmptyTool>
    );
  }

  if (isReady && isToolFetched && !isToolAvailable) {
    return (
      <EmptyTool>
        <h4>Tool not found</h4>
      </EmptyTool>
    );
  }

  return (
    <Container>
      {isRehydrated && isAuth && subscription === "Freemium" && !freeTrailEligible && (
        <Link href="/pricing" passHref>
          <SubscriptionOver>
            Your trial has come to an end! Click here to subscribe and keep
            writing great content!
          </SubscriptionOver>
        </Link>
      )}

      <ContentHeader>
        <ContentTitle>
          <span onClick={handleSidebar}><i><FaBars/></i></span>
          <p>{formContent.name}</p>
          <TutorialButton onClick={() => setShowTutorial(true)}>
            [Tutorial]
          </TutorialButton>
        </ContentTitle>
        {isAuth && (
          <CreditsLeft
            style={{ cursor: "pointer" }}
          >
            Words Left: {words ? words : 0}
          </CreditsLeft>
        )}
      </ContentHeader>
      <MainContent>
        <Tips>
          <TipsIcon src={TipsImg.src} alt="tips" />
          <span>
            The results depend on the information you input. So be sure to spend
            some time making it as accurate as possible.
          </span>
        </Tips>
        <br/>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="content-form">
            {formContent.fields.map((field, index) => {
              if (field.type === "InputText" || field.type === "TextArea") {
                const fieldValidation = validationSchema[field.key];
                const watchChar = watching[field.key]
                  ? watching[field.key]?.length
                  : 0;
                const minChar = fieldValidation?.min || 1;
                const maxChar = fieldValidation?.max || 10;
                const required = fieldValidation?.required || false;
                const minRows = Math.ceil(maxChar / 100);
                const maxRows = Math.ceil(maxChar / 100 + 3);
                const exceededChar = maxChar < watchChar;

                return (
                  <div className="form-group" key={index}>
                    <label htmlFor={field.key}>{field.name}</label>
                    <Input
                      minRows={minRows}
                      maxRows={maxRows}
                      autoComplete="off"
                      {...register(field.key, {
                        required,
                        // maxLength: maxChar,
                        // minLength: minChar,
                      })}
                      id={field.key}
                      defaultValue={
                        isCurrentInput ? defaultInput.input[field.key] : null
                      }
                      placeholder={field.placeholder}
                    />
                    {field?.tips?.text && (
                      <UncontrolledTooltip placement="auto" target={field.key}>
                        {field?.tips?.text}
                      </UncontrolledTooltip>
                    )}

                    {/* <WordCount exceededChar={exceededChar}>
                      {watchChar}/{maxChar} Max Characters
                    </WordCount> */}
                  </div>
                );
              } else if (field.type === "selectBox") {
                const tones = field.key.split(",").map((key) => key.trim());

                return (
                  <div className="form-group" key={index}>
                    <label htmlFor={field.type}>{field.name}</label>
                    <OptionSelect {...register(field.name)} id={field.type}>
                      {tones.map((tone) => (
                        <option key={tone} value={tone}>
                          {tone}
                        </option>
                      ))}
                    </OptionSelect>
                    {field?.tips?.text && (
                      <UncontrolledTooltip placement="auto" target={field.type}>
                        {field?.tips?.text}
                      </UncontrolledTooltip>
                    )}
                  </div>
                );
              } else if (field.type === "InputNumber") {
                const fieldValidation = validationSchema[field.key];
                // const minChar = fieldValidation?.min || 1;
                // const maxChar = fieldValidation?.max || 10;
                const required = fieldValidation?.required || false;

                return (
                  <div className="form-group" key={index}>
                    <label htmlFor={field.key}>{field.name}</label>
                    <InputNumber
                      type="number"
                      autoComplete="off"
                      // min={minChar}
                      // max={maxChar}
                      {...register(field.key, {
                        required,
                        // max: maxChar,
                        // min: minChar,
                      })}
                      id={field.key}
                      defaultValue={"1"
                        // isCurrentInput ? defaultInput.input[field.key] : null
                      }
                      placeholder={field.placeholder}
                    />
                    {field?.tips?.text && (
                      <UncontrolledTooltip placement="auto" target={field.key}>
                        {field?.tips?.text}
                      </UncontrolledTooltip>
                    )}
                  </div>
                );
              }
              return null;
            })}

            <SubmitAction>
              <Tips>
                <TipsIcon src={TipsImg.src} alt="tips" />
                <span>
                  Click Generate to get better results, don&apos;t forget to
                  bookmark your favorite result.
                </span>
              </Tips>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    Generating
                    <Spinner style={{ marginLeft: "5px" }} size="10px" />
                  </>
                ) : contentTexts.length > 0 ? (
                  "Generate more"
                ) : (
                  "Generate"
                )}
              </Button>
            </SubmitAction>
          </form>
        </div>
        {contentTexts.length > 0 && <GenerateResult />}
      </MainContent>
    </Container>
  );
};

const EmptyTool = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const Container = styled.div`
  padding: 2rem;
`;

const SubscriptionOver = styled.div`
  background: #f44336;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-weight: 500;
  padding: 15px 0;
  text-align: center;
  user-select: none;
  margin-bottom: 20px;
`;

const ContentHeader = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  p {
    flex: 4;
    font-size: 24px;
    line-height: 34px;
    margin: 0;
    font-weight: 700;
    color: black;
  }

  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 0;

    p {
      flex: none;
      font-size: 20px;
      line-height: 34px;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ContentTitle = styled.div`
  display: flex;
  align-items: baseline;

  span {
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    margin-right: 1.5rem;
    padding: 0px 8px;
    border: 2px solid #8d8d8d;
    border-radius: 5px;
    @media (min-width: 990px) {
      display: none;
    }
  }
`;

const CreditsLeft = styled.div`
  font-size: 18px;
  font-weight: 500;

  @media (max-width: 992px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    margin-top: 1rem;
    float: right;
  }
`;

const MainContent = styled.div`
  margin: 1rem 0;

  label {
    font-size: 16px;
  }
`;

const Tips = styled.div`
  margin: 1rem 0;

  i {
    margin-right: 5px;
    color: #ffc735;
  }
  span {
    font-weight: 300;
    font-size: 14px;
    line-height: 24px;
  }
`;

const TipsIcon = styled.img`
  width: 28px;
  padding-right: 4px;
`;

const WordCount = styled.p`
  text-align: right;
  color: ${({ exceededChar }) => (exceededChar ? "red" : "gray")};
`;

const SubmitAction = styled.div`
  text-align: center;
`;

const Input = styled(TextareaAutosize)`
  width: 100%;
  /* height: 45px; */
  padding: 15px 20px;
  outline: none;
  border: 1px solid #b4b4b4;
  border-radius: 8px;
  color: black;
  font-size: 16px;
  display: block;
  resize: none;
  margin: 15px 0 20px 0;
`;

const InputNumber = styled.input`
  width: 100%;
  height: 45px;
  padding: 15px 20px;
  outline: none;
  border: 1px solid #b4b4b4;
  border-radius: 8px;
  color: black;
  font-size: 16px;
  display: block;
  resize: none;
  margin: 15px 0 20px 0;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  height: 270px;
  padding: 15px 20px;
  outline: none;
  border: 1px solid #b4b4b4;
  border-radius: 8px;
  color: black;
  font-size: 16px;
  display: block;
  resize: none;
  margin: 15px 0 20px 0;
`;

const OptionSelect = styled.select`
  width: 100%;
  height: 45px;
  padding: 15px 20px;
  outline: none;
  border: 1px solid #b4b4b4;
  border-radius: 8px;
  color: #748194;
  font-size: 16px;
  display: block;
  background: transparent;
  margin: 15px 0 20px 0;
`;

const Button = styled.button`
  display: inline-flex;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 2.5rem;
  border: none;
  border-radius: 5px;
  outline: none;
  background-color: #10a37f;
  color: white;
  transition: all 0.5s;
`;

const TutorialButton = styled.button`
  margin: 0 0 0 10px;
  padding: 0;
  background: none;
  border: none;
  color: #007fff;
`;

export default InputGeneratingBox;
