import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Collapse, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import * as yup from "yup";
import "@pathofdev/react-tag-input/build/index.css";

import { UserLayout as Layout } from "@/layout";
import EditorJS from "@/components/completeblogeditor";
import CustomToolbar from "@/components/editor/CustomToolbar";
import { BlogHeadlineComplete, BlogData } from "@/components/blog";
import {
  resetCompleteBlog,
  setCurrentTask,
  setBlogHeadline,
  setBlogAbout,
  postBlogContents,
  postEditorToolsContent,
  setBlogContent,
  setBlogComplete,
  setEditor,
  selectors as blogSelector,
} from "@/redux/slices/completeBlog";
import {
  resetBlogsDraft,
  updateBlog,
  createBlog,
  selectors as draftSelector,
} from "@/redux/slices/draft";
import {
  setAccessTask,
  setBlogResetModal,
  selectors as uiSelector,
  setSigninModal,
} from "@/redux/slices/ui";
import {
  useBeforeunload,
  useWarnIfUnsavedChanges,
  useQuillValueIsChange,
  useQuillCounter,
  useQuillSelected,
  useUser,
  useSidebar,
  useToolAccess,
  useSubscriberModal,
  useWriterAccess,
} from "@/hooks";
import { SubscriberModal } from "@/components/modals/subscriber";
import { BlogResetModal } from "@/components/modals/blogs";
import { MainSidebar } from "@/components/sidebar";
import GenerateButton from "@/components/blog/components/GenerateButton";
// import Plagiarism from "@/components/Plagiarism";
import WriterPlagiarism from "@/components/WriterPlagiarism";
import WriterToolTab from "@/components/WriterToolTab";
import CreditsLeft from "@/components/CreditsLeft";
import TipsImg from "@/assets/images/generate-tips.png";
import { toastMessage, yupValidate, quillTypingInsert } from "@/utils";
import {
  AI_COMPLETE_BLOG_WRITER,
  BLOG_WRITING,
  SHORT_BLOG,
  LONG_BLOG,
} from "@/appconstants";
import * as MESSAGE from "@/appconstants/message";
import toolsvalidation from "@/data/toolsvalidation";
import {
  PARAPHRASING,
  EXPANDER,
  SIMPLIFIER,
  SUMMARIZER,
  ABSTRACT,
  NOTES_FROM_PASSAGE,
  GRAMMAR_FIXER,
  CHANGE_TONE,
  ACTIVE_PASSIVE,
  BLOG_TOPIC,
} from "@/appconstants";

import {
  postCheckPlagiarism,
  plagiarismSelector,
  plagiarismActions,
} from "@/redux/slices/plagiarism";
import { selectors as subscriberSelector } from "@/redux/slices/subscriber";
import pricesInfo from "@/data/price.json";

const contentTools = [
  {
    name: "Topic Writing",
    key: BLOG_TOPIC,
  },
  {
    name: "Paraphrase",
    key: PARAPHRASING,
  },
  {
    name: "Expand",
    key: EXPANDER,
  },
  {
    name: "Simplify",
    key: SIMPLIFIER,
  },
  {
    name: "Active Passive",
    key: ACTIVE_PASSIVE,
  },
  {
    name: "Summarizer",
    key: SUMMARIZER,
  },
  // {
  //   name: "Abstract",
  //   key: ABSTRACT,
  // },
  {
    name: "Key Takeaways",
    key: NOTES_FROM_PASSAGE,
  },
  {
    name: "Grammar Fixer",
    key: GRAMMAR_FIXER,
  },
  {
    name: "Change Tone",
    key: CHANGE_TONE,
  },
];

const blogLengthItems = [
  { name: "Short", key: SHORT_BLOG },
  { name: "Long", key: LONG_BLOG },
];

const reactTagValidation = (value) => {
  const validateValue = value
    .trim()
    .split(" ")
    .filter((item) => Boolean(item));
  const valueLength = validateValue.length;
  if (valueLength < 2 || valueLength > 5) {
    toastMessage.warn("Keyword must be between 2 and 5 words");
    return;
  }
  return validateValue.join(" ");
};

const schemaValidation = {
  blogSaveOrUpdate: {
    blogAbout: yup.string().required().min(10).max(200).label("Blog about"),
    headline: yup.string().required().min(10).max(200).label("Blog headline"),
    blogPost: yup.string().required().min(10).label("Blog content"),
    blogType: yup.string().required(),
  },
  generateCompleteBlog: {
    task: yup.string().required(),
    about: yup
      .string()
      .required("Write the Blog About first and then generate the Blog.")
      .min(10, "Blog About must be at least 10 characters long.")
      .max(400, "Blog About must be less than or equal 400 characters."),
    headline: yup
      .string()
      .required(
        "Generate or Write the Blog Headline first and then generate the Blog."
      )
      .min(10, "Blog Headline must be at least 10 characters long.")
      .max(150, "Blog Headline must be less than or equal 150 characters."),
  },
  blogTopicOnFieldForm: {
    about: yup
      .string()
      .required(
        "Write the Blog About first and then generate the Topic Writing."
      )
      .min(10, "Blog About must be at least 10 characters long.")
      .max(200, "Blog About must be less than or equal 200 characters.")
      .label("Blog about"),
    headline: yup
      .string()
      .required(
        "Generate or Write the Blog Headline first and then generate the Topic Writing."
      )
      .min(10, "Blog Headline must be at least 10 characters long.")
      .max(150, "Blog Headline must be less than or equal 150 characters.")
      .label("Blog headline"),
  },
};

const CompleteBlogGenerator = () => {
  const dispatch = useDispatch();
  const aboutRef = useRef(null);
  const headlineRef = useRef(null);
  const [quill, setQuill] = useState(null);
  const [showPlagiarisedContent, setShowPlagiarisedContent] = useState(false);
  const { register, handleSubmit, reset: resetForm } = useForm();

  const { subscriber } = useSelector(uiSelector.getModal);
  const { about, headline, currenttask, loading, complete, content } =
    useSelector(blogSelector.getCompleteBlogContent);
  const { currenttask: editorCurrentTask, value } = useSelector(
    blogSelector.getEditor()
  );
  const { activeId } = useSelector(draftSelector.getDraftBlogs());
  const { isAuth, subscribe } = useUser();
  const { showSidebar, showContent } = useSidebar();
  const quillCounter = useQuillCounter(quill);
  const { range, text: selectedText, lastIndex } = useQuillSelected(quill);
  const [editorCurrentTaskInput, setEditorCurrentTaskInput] = useState({});
  const { isEditorChange } = useQuillValueIsChange(quill);
  const [tags, setTags] = useState([]);
  const [showPlagi, setShowPlagi] = useState(false);
  const [blogLength, setBlogLength] = useState(SHORT_BLOG);
  const [accessBlog] = useToolAccess([blogLength]);
  const [accessEditorTool] = useToolAccess([editorCurrentTaskInput.task]);
  const [showSubscriberModal, setShowSubscriberModal] = useSubscriberModal();
  const hasWriterAccess = useWriterAccess();

  const isNewBlog = activeId === "";
  const editorTexts = quill ? quill.getText() : "";

  useBeforeunload((event) => {
    if (isEditorChange) {
      event.preventDefault();
    }
  });
  useWarnIfUnsavedChanges(isEditorChange);

  const handleEditorReset = useCallback(() => {
    quill?.setContents([]);
    setTags([]);
    dispatch(resetBlogsDraft());
    dispatch(resetCompleteBlog());
  }, [dispatch, quill]);

  useEffect(() => {
    if (blogLength === SHORT_BLOG) {
      setTags(tags.slice(0, 2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogLength]);

  useEffect(() => {
    if(selectedText.trim().length > 0) {
      setShowPlagiarisedContent(false);
    }
  }, [selectedText]);

  useEffect(() => {
    if (editorCurrentTask) {
      resetForm();
      setEditorCurrentTaskInput(
        toolsvalidation(
          editorCurrentTask,
          subscribe.subscription === "Freemium"
        )
      );
    } else {
      setEditorCurrentTaskInput({});
    }
  }, [editorCurrentTask, resetForm, subscribe.subscription]);

  useEffect(() => {
    return () => {
      handleEditorReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeBlogAbout = (e) => {
    dispatch(setBlogAbout({ input: e.target.value }));
  };

  const handleChangeBlogHeadline = (e) => {
    dispatch(setBlogHeadline({ input: e.target.value }));
  };

  const handleResetBlog = () => {
    if (!isAuth) {
      dispatch(setSigninModal(true));
      return;
    }
    dispatch(setBlogResetModal(true));
  };

  const handleSaveOrUpdate = () => {
    if (!isAuth) {
      dispatch(setSigninModal(true));
      return;
    }
    const { isValid, values } = yupValidate(schemaValidation.blogSaveOrUpdate, {
      blogAbout: about.input,
      headline: headline.input,
      blogPost: JSON.stringify(value),
      blogType: "GHOSTWRITER",
    });
    if (isValid) {
      if (!isNewBlog) {
        dispatch(
          updateBlog({
            id: activeId,
            data: { ...values },
          })
        ).then(({ payload }) => {
          if (payload.status === 200) {
            toastMessage.success("Blog update successfully");
          }
        });
      } else {
        dispatch(
          createBlog({
            data: { ...values },
          })
        ).then(({ payload }) => {
          if (payload.status === 201) {
            toastMessage.success("Blog saved successfully");
          }
        });
      }
    }
  };

  const handleNewBlog = () => {
    handleSaveOrUpdate();
    setTimeout(() => {
      handleEditorReset();
    }, 200);
  };

  const handleGenerateCompleteBlog = () => {
    if (!isAuth) {
      dispatch(setSigninModal(true));
      return;
    }
    if (showSubscriberModal.block) {
      setShowSubscriberModal({ ...showSubscriberModal, isOpen: true });
      return;
    }

    if (!accessBlog && !hasWriterAccess) {
      dispatch(
        setAccessTask({
          isOpen: true,
          message: MESSAGE.WRITING_TOOLS_NOT_ACCESS,
        })
      );
      return;
    }

    const { isValid, values } = yupValidate(
      schemaValidation.generateCompleteBlog,
      {
        task: blogLength,
        about: about.input,
        headline: headline.input,
      }
    );

    if (isValid) {
      dispatch(setCurrentTask(BLOG_WRITING));
      dispatch(
        postBlogContents({
          task: blogLength,
          data: {
            ...values,

            keywords: tags,
            ...(blogLength === LONG_BLOG &&
              editorTexts.length >= 10 && { contents: editorTexts }),
          },
        })
      ).then(({ payload }) => {
        const content = payload.data.generatedTexts[0] || "";

        const typingComplate = quillTypingInsert(quill, content, {
          range,
          lastIndex,
        });
        if (typingComplate) {
          dispatch(setBlogComplete({ items: [] }));
        }
      });
    }
  };

  const handleSelectedContentItem = (item) => {
    dispatch(setBlogContent({ item: `\n${item}`, items: [] }));
  };

  const isOpenEditorField = useMemo(() => {
    return range?.length > 0 && selectedText?.length > 0;
  }, [range?.length, selectedText?.length]);

  const handleSelectTool = (task) => {
    dispatch(setEditor({ currenttask: task }));
  };

  const isonFieldFormOk = useMemo(() => {
    const selectedLength = selectedText?.length * 1;
    const userText = editorCurrentTaskInput.userText;

    const isMin = selectedLength < userText?.min;
    const isMax = selectedLength > userText?.max;
    const result = !isMin && !isMax;
    return result;
  }, [editorCurrentTaskInput.userText, selectedText?.length]);

  const onFieldFormSubmit = (values) => {
    if (showSubscriberModal.block) {
      setShowSubscriberModal({ ...showSubscriberModal, isOpen: true });
      return;
    }

    if (!accessEditorTool && !hasWriterAccess) {
      dispatch(
        setAccessTask({
          isOpen: true,
          message: MESSAGE.WRITING_TOOLS_NOT_ACCESS,
        })
      );
      return;
    }

    const task = editorCurrentTaskInput.task;
    let datas = {
      task,
      userText: selectedText,
      ...values,
    };
    if (task === BLOG_TOPIC) {
      const { isValid, values } = yupValidate(
        schemaValidation.blogTopicOnFieldForm,
        { about: about.input, headline: headline.input }
      );
      datas = {
        ...datas,
        ...values,
      };
      if (!isValid) {
        return;
      }
    }
    isonFieldFormOk &&
      dispatch(postEditorToolsContent({ data: datas, task: datas.task }));
  };

  const { writer } = useSelector(plagiarismSelector.getPlagiarism);
  const { data: subscriptionInfo } = useSelector(
    subscriberSelector.getOwnSubscriber
  );

  const plagiarismChecker = pricesInfo[subscriptionInfo?.activeSubscription?.subscription]?.hasPlagiarism;

  const isPending = writer.loading === "pending";
  const quillText = quill?.getText() || "";

  const activeContent = useCallback(
    (texts) => {
      if (typeof texts !== "string") {
        return false;
      }
      const textsArr = texts
        .toString()
        .trim()
        .split(" ")
        .filter((text) => Boolean(text));

      return !isPending && textsArr.length >= 15;
    },
    [isPending]
  );

  const activeSelectedContent = activeContent(selectedText);

  const handleContent = () => {
    if (!isAuth) {
      dispatch(setSigninModal(true));
      return;
    }

    if(!plagiarismChecker) {
      toastMessage.warn("Please upgrade to Premium package!");
    }
    else if (!selectedText) {
      toastMessage.error("Please select text to check plagiarism!");
    }
    else if (activeSelectedContent) {
      dispatch(
        plagiarismActions.setWriterPlagiarism({
          content: quillText,
          position: range,
        })
      );
      dispatch(postCheckPlagiarism({ data: { text: selectedText } }));

      setShowPlagiarisedContent(true);
    }
    else {
      toastMessage.error("Minimum 15 words are required!");
    }
  };

  useEffect(() => {
    dispatch(plagiarismActions.setWriterPlagiarism({ data: [] }));
  }, [dispatch]);



  return (
    <Layout isSpecial="true">
      {showSidebar && <MainSidebar />}
      {showContent && (
        <BlogContainer>
          <Generator>
            <EditorSection>
              <TitleInput
                ref={headlineRef}
                autoComplete="off"
                type="text"
                name="headline"
                value={headline.input}
                placeholder="Blog Headline"
                onChange={handleChangeBlogHeadline}
              />
              {/* <Plagiarism quill={quill} /> */}
              <CustomToolbar quill={quill} />
              <EditorJS setQuillEditor={setQuill} />
            </EditorSection>
            <ToolsSection>
              <WriterToolTab setShowPlagi={setShowPlagi} showPlagi={showPlagi} />
              <ScollingTool>
                <WriterTools>
                  <Collapse isOpen={!showPlagi && !isOpenEditorField}>
                    <ToolsHeader>
                      <CreditsLeft />
                      <Tips>
                        <TipsIcon src={TipsImg.src} alt="tips" />
                        <span>
                          The results depend on the information you input. So be
                          sure to spend some time making it as specific as
                          possible.
                        </span>
                      </Tips>
                      <strong>Blog About</strong>
                      <textarea
                        ref={aboutRef}
                        onChange={handleChangeBlogAbout}
                        value={about.input}
                        rows="4"
                      ></textarea>
                      <StyledBlogLength>
                        <strong>Blog Length</strong>
                        <select
                          value={blogLength}
                          onChange={(e) => setBlogLength(e.target.value)}
                        >
                          {blogLengthItems.map(({ name, key }) => (
                            <option
                              key={key}
                              value={key}
                              disabled={
                                editorTexts.length > 10 && blogLength !== key
                              }
                            >
                              {name}
                            </option>
                          ))}
                        </select>
                      </StyledBlogLength>
                      <StyledKeyword>
                        <strong>Keywords</strong>
                        <ReactTagInput
                          tags={tags}
                          maxTags={blogLength === "short-blog" ? 2 : 3}
                          onChange={(newTags) => setTags(newTags)}
                          placeholder="Press enter to add keyword"
                          validator={reactTagValidation}
                        />
                      </StyledKeyword>
                      <GenerateButton
                        loading={
                          loading === "pending" && currenttask === BLOG_WRITING
                        }
                        onClick={
                          complete.success
                            ? handleResetBlog
                            : handleGenerateCompleteBlog
                        }
                      >
                        {complete.success
                          ? "Reset Blog"
                          : editorTexts.length >= 10
                          ? "Generate More"
                          : "Generate Blog"}
                      </GenerateButton>
                    </ToolsHeader>

                    <ToolsBody>
                      <BlogHeadlineComplete aboutRef={aboutRef} />
                    </ToolsBody>
                    <ToolBottom>
                      <button onClick={handleNewBlog}>New Blog</button>
                      <button onClick={handleSaveOrUpdate}>Save</button>
                      {/* <button onClick={() => console.log("coming soon")}>
                      Save
                    </button> */}
                    </ToolBottom>
                  </Collapse>
                  <Collapse isOpen={!showPlagi && isOpenEditorField}>
                    <ToolsHeader>
                      <strong>Selected Text</strong>
                      <br />
                      <StyledSelectedText>{selectedText}</StyledSelectedText>
                      <p style={{ textAlign: "right" }}>
                        {selectedText?.length}/
                        {editorCurrentTaskInput.userText.max} Max Characters
                      </p>
                    </ToolsHeader>
                    <ToolsBody>
                      <StyledToolSelection>
                        {contentTools.map((tool) => (
                          <StyledToolItem
                            onClick={() => handleSelectTool(tool.key)}
                            key={tool.key}
                            Active={tool.key === editorCurrentTask}
                          >
                            {tool.name}
                          </StyledToolItem>
                        ))}
                      </StyledToolSelection>
                      {Object.values(editorCurrentTaskInput).length > 0 && (
                        <div>
                          <form onSubmit={handleSubmit(onFieldFormSubmit)}>
                            {editorCurrentTaskInput.from && (
                              <StyledEditorSelectorOptions>
                                <label>From</label>
                                <select {...register("from")}>
                                  {editorCurrentTaskInput.from.map((i) => (
                                    <option key={i} value={i}>
                                      {i}
                                    </option>
                                  ))}
                                </select>
                              </StyledEditorSelectorOptions>
                            )}
                            {editorCurrentTaskInput.to && (
                              <StyledEditorSelectorOptions>
                                <label>To</label>
                                <select {...register("to")}>
                                  {editorCurrentTaskInput.to.map((i) => (
                                    <option key={i} value={i}>
                                      {i}
                                    </option>
                                  ))}
                                </select>
                              </StyledEditorSelectorOptions>
                            )}
                            {editorCurrentTaskInput.tone && (
                              <StyledEditorSelectorOptions>
                                <label>Tone</label>
                                <select {...register("tone")}>
                                  {editorCurrentTaskInput.tone.map((i) => (
                                    <option key={i} value={i}>
                                      {i}
                                    </option>
                                  ))}
                                </select>
                              </StyledEditorSelectorOptions>
                            )}
                            {editorCurrentTaskInput.numberOfSuggestions && (
                              <StyledEditorSelectorOptions>
                                <label>Number Of Suggestions</label>
                                <input
                                  type="number"
                                  min={
                                    editorCurrentTaskInput.numberOfSuggestions.min
                                  }
                                  max={
                                    editorCurrentTaskInput.numberOfSuggestions.max
                                  }
                                  defaultValue={
                                    editorCurrentTaskInput.numberOfSuggestions.min
                                  }
                                  {...register("numberOfSuggestions", {
                                    min: editorCurrentTaskInput
                                      .numberOfSuggestions.min,
                                    max: editorCurrentTaskInput
                                      .numberOfSuggestions.max,
                                    required:
                                      editorCurrentTaskInput.numberOfSuggestions
                                        .required,
                                  })}
                                />
                              </StyledEditorSelectorOptions>
                            )}
                            {editorCurrentTaskInput.numberOfPoints && (
                              <StyledEditorSelectorOptions>
                                <label>Number Of Points</label>
                                <input
                                  type="number"
                                  min={editorCurrentTaskInput.numberOfPoints.min}
                                  max={editorCurrentTaskInput.numberOfPoints.max}
                                  defaultValue={
                                    editorCurrentTaskInput.numberOfPoints.min
                                  }
                                  {...register("numberOfPoints", {
                                    min: editorCurrentTaskInput.numberOfPoints
                                      .min,
                                    max: editorCurrentTaskInput.numberOfPoints
                                      .max,
                                    required:
                                      editorCurrentTaskInput.numberOfPoints
                                        .required,
                                  })}
                                />
                              </StyledEditorSelectorOptions>
                            )}
                            <GenerateButton
                              disabled={!isonFieldFormOk}
                              onClick={null}
                              loading={content.loading === "pending"}
                            >
                              Generate
                            </GenerateButton>
                          </form>
                          {content.items.length > 0 && (
                            <div>
                              {content.items.map((item, index) => (
                                <div
                                  onClick={() => handleSelectedContentItem(item)}
                                  style={{
                                    border: "1px solid",
                                    padding: "5px",
                                    width: "100%",
                                    margin: "5px 0",
                                    cursor: "pointer",
                                  }}
                                  key={index}
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </ToolsBody>
                  </Collapse>
                  
                  <Collapse isOpen={showPlagi && !isOpenEditorField}>
                    <WriterPlagiarism quill={quill} />
                  </Collapse>

                  <Collapse isOpen={showPlagi && isOpenEditorField}>
                    {
                      showPlagiarisedContent ? (
                        <WriterPlagiarism quill={quill} />
                      ) : (
                        <>
                          <ToolsHeader>
                            <strong>Selected Text</strong>
                            <br />
                            <StyledSelectedText>{selectedText}</StyledSelectedText>
                          </ToolsHeader>
                          <ToolsBody>
                            <StyledPlagiarismTool>
                              <StyledButton onClick={handleContent}>
                                Plagiarism Checker
                              </StyledButton>
                            </StyledPlagiarismTool>
                          </ToolsBody>
                        </>
                      )
                    }
                  </Collapse>
                </WriterTools>
              </ScollingTool>
              <BlogResetModal quill={quill} id={AI_COMPLETE_BLOG_WRITER} />
            </ToolsSection>
          </Generator>
          <BlogData textData={quillCounter} />
        </BlogContainer>
      )}
      {subscriber?.usage && <SubscriberModal />}
    </Layout>
  );
};

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;

  // @media (max-width: 992px) {
  //   min-height: calc(100vh - 90px);
  // }

  @media (max-width: 768px) {
    padding: 0;
    min-height: 100vh;
    max-height: none;
    // flex-direction: column-reverse;
  }
`;

const Generator = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 80px);

  @media (max-width: 1024px) {
    min-height: calc(100vh - 100px);
  }

  @media (max-width: 1000px) {
    padding: 0;
    min-height: 100vh;
    max-height: none;
    margin-bottom: 2rem;
    flex-direction: column-reverse;
  }
`;

const EditorSection = styled.div`
  flex: 7;
  margin: 1rem 2rem;

  @media (max-width: 1024px) {
    margin: 0.2rem 2rem 0rem 2rem;
  }

  @media (max-width: 768px) {
    flex: 100%;
    margin: 0.2rem 1rem 0rem 1rem;
  }
`;

const ToolsSection = styled.div`
  flex: 5;
  border: solid #cbcbcb;
  border-width: 0 0 0 1px;

  @media (max-width: 768px) {
    flex: 100%;
  }
`;

const WriterTools = styled.div`
  margin: 1rem 2rem;

  @media (max-width: 768px) {
    margin: 1rem 1rem;
  }
`;

const StyledEditorSelectorOptions = styled.div`
  width: 100%;
  margin: 10px 0;

  label {
    display: block;
  }

  input {
    display: block;
    height: 2.2rem;
    outline: 0;
    width: 100%;
    padding: 2px 4px;
  }

  select {
    display: block;
    height: 2.2rem;
    outline: 0;
    width: 100%;
    padding: 2px 4px;
  }
`;

const ScollingTool = styled.div`
  position: sticky;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff0000;
  }

  @media (min-width: 1200px) {
    min-height: 75vh;
  }

  @media (min-width: 1024px) {
    min-height: 70vh;
  }

  @media (min-width: 768px) {
    max-height: 65vh;
  }
`;

const ToolControll = styled.div`
  // padding: 10px;
`;

const ToolsHeader = styled(ToolControll)`
  border-bottom: 1px solid #cbcbcb;

  p {
    font-weight: 300;
    font-size: 13px;
    line-height: 20px;
  }

  strong {
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    margin-bottom: 5px;
  }

  textarea {
    margin: 10px 0px;
    padding: 10px;
    background-color: white;
    border-radius: 3px;
    border: 1px solid #878787;
    box-sizing: border-box;
    outline: 0;
    resize: none;
    width: 100%;
  }
`;

const StyledToolSelection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 18px 0 30px;
`;

const StyledToolItem = styled.div`
  background: ${({ Active }) =>
    Active.toString() === "true" ? "#3e3e3e" : "white"};
  border-radius: 3px;
  border: 1.5px solid #3a4841;
  cursor: pointer;
  margin: 5px 4px;
  padding: 4px 6px;
  user-select: none;
  transition: 0.5s;
  margin-right: 5px;
  /* color: white; */
  color: ${({ Active }) => (Active.toString() === "true" ? "white" : "black")};
  font-size: 14px;
`;

const StyledSelectedText = styled.div`
  border: 1px solid;
  padding: 14px 18px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 20px;
  margin: 20px 0;
`;

const Tips = styled.div`
  margin: 1rem 0;

  span {
    font-weight: 300;
    font-size: 13px;
    line-height: 20px;
  }
`;

const TipsIcon = styled.img`
  width: 28px;
  padding-right: 4px;
`;

const ToolsBody = styled(ToolControll)``;

const TitleInput = styled.input`
  border: 0;
  outline: 0;
  width: 100%;
  margin: 0.5rem 0 1.5rem 0;
  font-size: 20px;
  font-weight: 500;
`;

const ToolBottom = styled(ToolControll)`
  display: flex;

  button {
    background-color: white;
    border: 1.5px solid #3a4841;
    padding: 3px 10px;
    border-radius: 3px;
    line-height: 22px;
    width: 100%;
    justify-content: center;
  }

  button:first-child {
    margin-right: 15px;
  }
`;

const StyledKeyword = styled.div`
  .react-tag-input {
    margin-top: 8px;
    border: 1px solid #878787;
  }
  margin: 10px 0;
  strong {
    margin-bottom: 10px;
  }
`;

const StyledBlogLength = styled.div`
  margin: 10px 0;
  select {
    width: 100%;
    margin-top: 8px;
    outline: none;
    height: 2.2rem;
    padding: 0 5px;
  }
`;

const StyledPlagiarismTool = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin: 18px 0 30px;
`;

const StyledButton = styled(Button)`
  box-shadow: none !important;
  background-color: #10a37f !important;
  border-radius: 6px;
  color: #fff !important;
  padding: 6px 16px;
  font-size: 14px;

  &:hover, 
  &:focus,
  &:active {
    background-color: #10a37f !important;
    border-radius: 8px;
    color: #fff !important;
  }

  @media (max-width: 1000px) {
    padding: 5px 14px;
  }

  @media (max-width: 900px) {
    padding: 4px 12px;
    font-size: 12px;
  }
`;

export default CompleteBlogGenerator;
