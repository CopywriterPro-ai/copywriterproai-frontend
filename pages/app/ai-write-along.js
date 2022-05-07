import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Collapse } from "reactstrap";
import { useForm } from "react-hook-form";
// import "@pathofdev/react-tag-input/build/index.css";
// import ReactTagInput from "@pathofdev/react-tag-input";
import * as yup from "yup";

import {
  BlogHeadline,
  BlogIntro,
  BlogOutro,
  BlogOutline,
  BlogData,
} from "@/components/blog";
import EditorJS from "@/components/editor";
import CustomToolbar from "@/components/editor/CustomToolbar";
import { BlogResetModal } from "@/components/modals/blogs";
import { SubscriberModal } from "@/components/modals/subscriber";
import { MainSidebar } from "@/components/sidebar";
import GenerateButton from "@/components/blog/components/GenerateButton";
import CreditsLeft from "@/components/CreditsLeft";
import {
  useSidebar,
  useUser,
  useQuillValueIsChange,
  useQuillCounter,
  useQuillSelected,
  useBeforeunload,
  useWarnIfUnsavedChanges,
  useToolAccess,
  useSubscriberModal,
  useWriterAccess,
} from "@/hooks";
import { UserLayout as Layout } from "@/layout";
import { selectors as uiSelector, setBlogResetModal } from "@/redux/slices/ui";
import {
  postWriteAlongEditorToolsContent,
  writeAlongActions,
  selectors as writeAlongSelector,
} from "@/redux/slices/blog";
import {
  resetBlogsDraft,
  createBlog,
  updateBlog,
  selectors as draftSelector,
} from "@/redux/slices/draft";
import { toastMessage, yupValidate } from "@/utils";
import {
  AI_BLOG_WRITER,
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
import * as MESSAGE from "@/appconstants/message";
import toolsvalidation from "@/data/toolsvalidation";
import TipsImg from "@/assets/images/generate-tips.png";

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

const schemaValidation = {
  blogSaveOrUpdate: {
    blogAbout: yup.string().required().min(10).max(200).label("Blog about"),
    headline: yup.string().required().min(10).max(200).label("Blog headline"),
    blogPost: yup.string().required().min(10).label("Blog content"),
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

const BlogGenerator = () => {
  const dispatch = useDispatch();

  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const [quill, setQuill] = useState(null);
  const { register, handleSubmit, reset: resetForm } = useForm();

  const { about, headline, content } = useSelector(
    writeAlongSelector.getWriteAlong
  );
  const { currenttask: editorCurrentTask, value } = useSelector(
    writeAlongSelector.getEditor()
  );
  const { activeId } = useSelector(draftSelector.getDraftBlogs());
  const { subscriber } = useSelector(uiSelector.getModal);
  const { subscribe } = useUser();
  const { showSidebar, showContent } = useSidebar();
  const quillCounter = useQuillCounter(quill);
  const { isEditorChange } = useQuillValueIsChange(quill);
  const { range, text: selectedText } = useQuillSelected(quill);
  const [editorCurrentTaskInput, setEditorCurrentTaskInput] = useState({});
  const [accessEditorTool] = useToolAccess([editorCurrentTaskInput.task]);
  const [showSubscriberModal, setShowSubscriberModal] = useSubscriberModal();
  const hasWriterAccess = useWriterAccess();

  useBeforeunload((event) => {
    if (isEditorChange) {
      event.preventDefault();
    }
  });
  useWarnIfUnsavedChanges(isEditorChange);

  const isNewBlog = activeId === "";

  const handleEditorReset = useCallback(() => {
    quill?.setContents([]);
    dispatch(resetBlogsDraft());
    dispatch(writeAlongActions.resetBlog());
  }, [dispatch, quill]);

  useEffect(() => {
    return () => {
      handleEditorReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleChangeBlogAbout = (e) => {
    dispatch(writeAlongActions.setAbout({ item: e.target.value }));
  };

  const handleChangeTitle = (e) => {
    dispatch(writeAlongActions.setHeadline({ item: e.target.value }));
  };

  const handleResetBlog = () => {
    dispatch(setBlogResetModal(true));
  };

  const handleSaveOrUpdate = () => {
    const { isValid, values } = yupValidate(schemaValidation.blogSaveOrUpdate, {
      blogAbout: about.item,
      headline: headline.item,
      blogPost: JSON.stringify(value),
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
            toastMessage.success("Blog updated successfully");
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

  const handleSelectTool = (task) => {
    dispatch(writeAlongActions.setEditor({ currenttask: task }));
  };

  const isOpenEditorField = useMemo(() => {
    return range?.length > 0 && selectedText?.length > 0;
  }, [range?.length, selectedText?.length]);

  const isonFieldFormOk = useMemo(() => {
    const selectedLength = selectedText?.length * 1;
    const userText = editorCurrentTaskInput.userText;

    const isMin = selectedLength < userText?.min;
    const isMax = selectedLength > userText?.max;
    return !isMin && !isMax;
  }, [editorCurrentTaskInput.userText, selectedText?.length]);

  const handleSelectedContentItem = (item) => {
    dispatch(writeAlongActions.setContent({ item: `\n${item}`, items: [] }));
  };

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
        { about: about.item, headline: headline.item }
      );
      datas = { ...datas, ...values };
      if (!isValid) {
        return;
      }
    }

    isonFieldFormOk &&
      dispatch(
        postWriteAlongEditorToolsContent({ data: datas, task: datas.task })
      );
  };

  return (
    <Layout>
      {showSidebar && <MainSidebar />}
      {showContent && (
        <BlogContainer>
          {/* <RouterPrompt when={isUpdateChange} /> */}
          <EditorSection>
            <TitleInput
              ref={titleRef}
              autoComplete="off"
              type="text"
              name="headline"
              value={headline.item}
              placeholder="Blog Headline"
              onChange={handleChangeTitle}
            />
            <CustomToolbar />
            <EditorJS setQuillEditor={setQuill} />
          </EditorSection>
          <ToolsSection>
            <ScollingTool>
              <Collapse isOpen={!isOpenEditorField}>
                <ToolsHeader>
                  <CreditsLeft />
                  <Tips>
                    <TipsIcon src={TipsImg.src} alt="tips" />
                    <span>
                      The results depend on the information you input. So be
                      sure to spend some time making it as specific as possible.
                    </span>
                  </Tips>
                  <strong>Blog About</strong>
                  <textarea
                    ref={aboutRef}
                    onChange={(e) => handleChangeBlogAbout(e)}
                    value={about.item}
                    rows="4"
                  ></textarea>
                </ToolsHeader>
                <ToolsBody>
                  <BlogHeadline aboutRef={aboutRef} />
                  <BlogIntro
                    titleRef={titleRef}
                    aboutRef={aboutRef}
                    quillRef={quill}
                  />
                  <BlogOutline aboutRef={aboutRef} quillRef={quill} />
                  <BlogOutro
                    titleRef={titleRef}
                    aboutRef={aboutRef}
                    quillRef={quill}
                  />
                </ToolsBody>

                <ToolBottom>
                  <button onClick={handleResetBlog}>Reset</button>
                  <button onClick={handleSaveOrUpdate}>Save</button>
                </ToolBottom>
              </Collapse>
              <Collapse isOpen={isOpenEditorField}>
                <ToolsHeader>
                  <strong>Selected Text</strong>
                  <br />
                  <StyledSelectedText>{selectedText}</StyledSelectedText>
                  <p style={{ textAlign: "right" }}>
                    {selectedText?.length ? selectedText.length : 0}/
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
                                min: editorCurrentTaskInput.numberOfSuggestions
                                  .min,
                                max: editorCurrentTaskInput.numberOfSuggestions
                                  .max,
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
                                min: editorCurrentTaskInput.numberOfPoints.min,
                                max: editorCurrentTaskInput.numberOfPoints.max,
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
            </ScollingTool>
          </ToolsSection>
          <BlogResetModal quill={quill} id={AI_BLOG_WRITER} />
        </BlogContainer>
      )}
      {subscriber?.usage && <SubscriberModal />}
      <BlogData textData={quillCounter} />
    </Layout>
  );
};

const BlogContainer = styled.div`
  display: flex;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
    flex-direction: column-reverse;
  }
`;

const EditorSection = styled.div`
  flex: 9;
  padding: 5px;

  @media (max-width: 768px) {
    flex: 100%;
  }
`;

const ToolsSection = styled.div`
  flex: 3;
  border: solid #cbcbcb;
  border-width: 0 0 0 1px;
  padding: 10px;

  @media (max-width: 768px) {
    flex: 100%;
  }
`;

const ScollingTool = styled.div`
  /* position: fixed;
  height: 100vh;
  overflow-y: scroll; */

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff0000;
  }
`;

const ToolControll = styled.div`
  padding: 10px;
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
  word-wrap: break-word;
  padding: 22px 15px 22px 15px;
  font-size: 25px;
  font-weight: 500;
  // background-color: rgb(232 232 232 / 45%);

  &:hover {
  }
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

const StyledSelectedText = styled.div`
  border: 1px solid;
  padding: 14px 18px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 20px;
  margin: 20px 0;
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

export default BlogGenerator;
