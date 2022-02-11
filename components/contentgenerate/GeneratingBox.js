import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UncontrolledTooltip } from "reactstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
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
  setSubscriberUsageModal,
} from "@/redux/slices/ui";
import Loader from "@/components/common/Loader";
import Spinner from "@/components/common/Spinner";
import GenerateResult from "./GenerateResult";
import TipsImg from "@/assets/images/generate-tips.png";
import { useUser, useSubscriberModal } from "@/hooks";
import toolsvalidation from "@/data/toolsvalidation";

const InputGeneratingBox = () => {
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
    isAuth,
    subscribe: { words },
  } = useUser();
  const showSubscriberModal = useSubscriberModal();

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
    dispatch(setSubscriberUsageModal({ usage: true, message }));
  };

  const validationSchema = useMemo(() => {
    if (activeKey) {
      return toolsvalidation(activeKey, true);
    } else {
      return {};
    }
  }, [activeKey]);

  const onSubmit = (formData) => {
    const task = activeKey;
    const data = { ...formData, task };

    if (isAuth) {
      if (!showSubscriberModal) dispatch(postGenerateContents({ data, task }));
      else handleSubscriberModalOpen();
    } else {
      dispatch(setSigninModal(true));
    }
  };

  const handleSidebar = () => {
    dispatch(setContentSidebar(true));
  };

  const isLoading = loading === "pending";
  let isCurrentInput = defaultInput?.key === activeKey;

  if (!isToolFetched) {
    return <Spinner />;
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
      <ContentHeader>
        <ContentTitle>
          <span onClick={handleSidebar} className="fas fa-bars"></span>
          <p>{formContent.name}</p>
        </ContentTitle>
        {isAuth && (
          <CreditsLeft
            onClick={() => handleSubscriberModalOpen()}
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
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="content-form">
            {formContent.fields.map((field, index) => {
              if (field.type === "InputText") {
                const fieldValidation = validationSchema[field.key];
                const watchChar = watching[field.key]
                  ? watching[field.key]?.length
                  : 0;
                const minChar = fieldValidation?.min || 0;
                const maxChar = fieldValidation?.max || 10;
                const required = fieldValidation?.required || false;
                const exceededChar = maxChar < watchChar;

                return (
                  <div className="form-group" key={index}>
                    <label htmlFor={field.key}>{field.name}</label>
                    <Input
                      maxRows={3}
                      autoComplete="off"
                      {...register(field.key, {
                        required,
                        maxLength: maxChar,
                        minLength: minChar,
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

                    <WordCount exceededChar={exceededChar}>
                      {watchChar}/{maxChar} Max Characters
                    </WordCount>
                  </div>
                );
              } else if (field.type === "TextArea") {
                const fieldValidation = validationSchema[field.key];
                const watchChar = watching[field.key]
                  ? watching[field.key]?.length
                  : 0;
                const minChar = fieldValidation?.min || 0;
                const maxChar = fieldValidation?.max || 10;
                const required = fieldValidation?.required || false;
                const exceededChar = maxChar < watchChar;

                return (
                  <div className="form-group" key={index}>
                    <label htmlFor={field.key}>{field.name}</label>
                    <TextArea
                      minRows={4}
                      maxRows={8}
                      {...register(field.key, {
                        required,
                        maxLength: maxChar,
                        minLength: minChar,
                      })}
                      id={field.key}
                      defaultValue={
                        isCurrentInput ? defaultInput.input[field.key] : null
                      }
                      rows="5"
                      placeholder={field.placeholder}
                    />

                    {field?.tips?.text && (
                      <UncontrolledTooltip placement="auto" target={field.key}>
                        {field?.tips?.text}
                      </UncontrolledTooltip>
                    )}

                    <WordCount exceededChar={exceededChar}>
                      {watchChar}/{maxChar} Max Characters
                    </WordCount>
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
                const minChar = fieldValidation?.min || 0;
                const maxChar = fieldValidation?.max || 10;
                const required = fieldValidation?.required || false;

                return (
                  <div className="form-group" key={index}>
                    <label htmlFor={field.key}>{field.name}</label>
                    <InputNumber
                      type="number"
                      autoComplete="off"
                      min={minChar}
                      max={maxChar}
                      {...register(field.key, {
                        required,
                        max: maxChar,
                        min: minChar,
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
                    <Loader style={{ marginLeft: "5px" }} size="10px" />
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
  padding-top: 15px;
`;

const ContentHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid #b4b4b4;
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;

  p {
    flex: 4;
    font-size: 23px;
    line-height: 34px;
    margin: 0;
  }

  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 0;

    p {
      flex: none;
      font-size: 16px;
      line-height: 34px;
    }
  }
`;

const ContentTitle = styled.div`
  display: flex;
  align-items: center;

  span {
    cursor: pointer;
    font-size: 20px;
    margin-right: 10px;

    @media (min-width: 990px) {
      display: none;
    }
  }
`;

const CreditsLeft = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const MainContent = styled.div`
  margin: 1rem 0;
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
  height: 45px;
  padding: 6px 15px;
  outline: none;
  border: 1px solid #b4b4b4;
  color: black;
  font-size: 16px;
  display: block;
  resize: none;
`;

const InputNumber = styled.input`
  width: 100%;
  height: 45px;
  padding: 6px 15px;
  outline: none;
  border: 1px solid #b4b4b4;
  color: black;
  font-size: 16px;
  display: block;
  resize: none;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  height: 270px;
  padding: 6px 15px;
  outline: none;
  border: 1px solid #b4b4b4;
  color: black;
  font-size: 16px;
  display: block;
  resize: none;
`;

const OptionSelect = styled.select`
  width: 100%;
  height: 45px;
  padding: 6px 15px;
  outline: none;
  border: 1px solid #b4b4b4;
  color: #748194;
  font-size: 16px;
  display: block;
  background: transparent;
`;

const Button = styled.button`
  display: inline-flex;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.6rem 2.8rem;
  border: 2px solid #3a4841;
  border-radius: 5px;
  outline: none;
  background-color: transparent;
  transition: all 0.5s;
`;

export default InputGeneratingBox;
