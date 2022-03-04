import { useRef, useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Collapse } from "reactstrap";
import { useForm } from "react-hook-form";

import { UserLayout as Layout } from "@/layout";
import EditorJS from "@/components/completeblogeditor";
import CustomToolbar from "@/components/editor/CustomToolbar";
import { BlogHeadlineComplete } from "@/components/blog";
import {
  createBlog,
  setCurrentTask,
  updateBlog,
  setBlogHeadline,
  setBlogAbout,
  postBlogContents,
  postEditorToolsContent,
  setBlogContent,
  setEditor,
  selectors as blogSelector,
} from "@/redux/slices/completeBlog";
import {
  setBlogResetModal,
  setSigninModal,
  selectors as uiSelector,
} from "@/redux/slices/ui";
import {
  // useBeforeunload,
  // useWarnIfUnsavedChanges,
  useQuillCounter,
  useQuillSelected,
  useUser,
  useSidebar,
} from "@/hooks";
import { SubscriberModal } from "@/components/modals/subscriber";
import { BlogResetModal } from "@/components/modals/blogs";
import { MainSidebar } from "@/components/sidebar";
import GenerateButton from "@/components/blog/components/GenerateButton";
import TipsImg from "@/assets/images/generate-tips.png";
import { toastMessage } from "@/utils";
import { AI_COMPLETE_BLOG_WRITER, BLOG_WRITING } from "@/appconstants";
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
  {
    name: "Abstract",
    key: ABSTRACT,
  },
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

const CompleteBlogGenerator = () => {
  const dispatch = useDispatch();
  const aboutRef = useRef(null);
  const headlineRef = useRef(null);
  const [quill, setQuill] = useState(null);
  const { register, handleSubmit, reset: resetForm } = useForm();

  const { subscriber } = useSelector(uiSelector.getModal);
  const { about, headline, currenttask, loading, complete, content } =
    useSelector(blogSelector.getCompleteBlogContent);
  const { currenttask: editorCurrentTask } = useSelector(
    blogSelector.getEditor()
  );
  const { isAuth } = useUser();
  const { showSidebar, showContent } = useSidebar();
  const quillCounter = useQuillCounter(quill);
  const { range, text: selectedText } = useQuillSelected(quill);
  const isNewBlog = true;
  const [editorCurrentTaskInput, setEditorCurrentTaskInput] = useState({});

  // useEffect(() => {
  //   if (range.length === 0) {
  //     dispatch(setEditor({ currenttask: null }));
  //   }
  // }, [dispatch, range.length]);

  useEffect(() => {
    if (editorCurrentTask) {
      resetForm();
      setEditorCurrentTaskInput(toolsvalidation(editorCurrentTask));
    } else {
      setEditorCurrentTaskInput({});
    }
  }, [editorCurrentTask, resetForm]);

  const handleChangeBlogAbout = (e) => {
    dispatch(setBlogAbout({ input: e.target.value }));
  };

  const handleChangeBlogHeadline = (e) => {
    dispatch(setBlogHeadline({ input: e.target.value }));
  };

  const handleResetBlog = () => {
    dispatch(setBlogResetModal(true));
  };

  const handleSaveOrUpdate = () => {
    if (!isNewBlog) {
      if (title.length === 0 || value.length === 0 || about.length === 0) {
        toastMessage.customWarn(
          "Blog Headline, Blog About and Blog Content is required!",
          3000,
          {
            toastId: "updateblog",
          }
        );
        return;
      }
      if (isAuth) {
        dispatch(
          updateBlog({
            id: currentBlogId,
            data: {
              blogAbout: about,
              headline: title,
              blogPost: JSON.stringify(value),
            },
          })
        ).then(({ payload }) => {
          if (payload.status === 200) {
            toastMessage.success("Blog update successfully");
          }
        });
      } else {
        dispatch(setSigninModal(true));
      }
    } else {
      if (title.length === 0 || value.length === 0 || about.length === 0) {
        toastMessage.customWarn(
          "Blog Headline, Blog About and Blog Content is required!",
          3000,
          {
            toastId: "saveblog",
          }
        );
        return;
      }
      if (isAuth) {
        dispatch(
          createBlog({
            data: {
              blogAbout: about,
              headline: title,
              blogPost: JSON.stringify(value),
            },
          })
        ).then(({ payload }) => {
          if (payload.status === 201) {
            toastMessage.success("Blog saved successfully");
          }
        });
      } else {
        dispatch(setSigninModal(true));
      }
    }
  };

  const handleGenerateCompleteBlog = () => {
    if (about.input.length < 10) {
      return toastMessage.warn(
        "Blog about length must be at least 10 characters long"
      );
    }
    if (about.input.length > 400) {
      return toastMessage.warn(
        "Blog about length must be max 400 characters long"
      );
    }
    dispatch(setCurrentTask(BLOG_WRITING));
    dispatch(
      postBlogContents({
        task: "blog",
        data: {
          task: BLOG_WRITING,
          about: about.input,
        },
      })
    );
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

  const isOk = useMemo(() => {
    const selectedLength = selectedText?.length * 1;
    const userText = editorCurrentTaskInput.userText;

    const isMin = selectedLength < userText?.min;
    const isMax = selectedLength > userText?.max;
    const isOk = !isMin && !isMax;
    return isOk;
  }, [editorCurrentTaskInput.userText, selectedText?.length]);

  const onFieldFormSubmit = (values) => {
    const task = editorCurrentTaskInput.task;

    let datas = {
      task,
      userText: selectedText,
      ...values,
    };

    if (task === BLOG_TOPIC) {
      if (about.input.length === 0) {
        return toastMessage.warn("Blog about required");
      } else if (headline.input.length === 0) {
        return toastMessage.warn("Blog headline required");
      }
      datas = {
        ...datas,
        about: about.input,
        headline: headline.input,
      };
    }

    isOk &&
      dispatch(postEditorToolsContent({ data: datas, task: datas.task })).then(
        (res) => {
          // if (res.payload.status === 200) {
          //   const { index, length } = range;
          //   const Index = index + length;
          //   quill.setSelection(Index, 0);
          //   dispatch(
          //     setEditor({ range: { index: Index, length: 0 }, selected: null })
          //   );
          // }
        }
      );
  };

  return (
    <Layout>
      {showSidebar && <MainSidebar />}
      {showContent && (
        <BlogContainer>
          <EditorSection>
            <TitleInput
              ref={headlineRef}
              autoComplete="off"
              type="text"
              name="title"
              value={headline.input}
              placeholder="Blog Headline"
              onChange={handleChangeBlogHeadline}
            />
            <CustomToolbar />
            <EditorJS setQuillEditor={setQuill} />
          </EditorSection>
          <ToolsSection>
            <Collapse isOpen={!isOpenEditorField}>
              <ScollingTool>
                <ToolsHeader>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <strong>
                      Readability: {quillCounter.readabilityScore}
                    </strong>
                    <strong>Sentence: {quillCounter.sentence}</strong>
                    <strong>Word: {quillCounter.word}</strong>
                    <strong>Character: {quillCounter.character}</strong>
                  </div>
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
                    onChange={handleChangeBlogAbout}
                    value={about.input}
                    rows="4"
                  ></textarea>
                  <Collapse
                    isOpen={!complete.success && about.input.trim().length > 0}
                  >
                    <GenerateButton
                      loading={
                        loading === "pending" && currenttask === BLOG_WRITING
                      }
                      onClick={handleGenerateCompleteBlog}
                    >
                      Generate Blog
                    </GenerateButton>
                  </Collapse>
                </ToolsHeader>

                <ToolsBody>
                  <BlogHeadlineComplete aboutRef={aboutRef} />
                </ToolsBody>
                <ToolBottom>
                  <button onClick={handleResetBlog}>Reset</button>
                  {/* <button onClick={handleSaveOrUpdate}>Save</button> */}
                  {/* <button onClick={() => console.log("coming soon")}>
                    Save
                  </button> */}
                </ToolBottom>
              </ScollingTool>
            </Collapse>
            <Collapse isOpen={isOpenEditorField}>
              <ScollingTool>
                <ToolsHeader>
                  <strong>Selected Text</strong>
                  <br />
                  <StyledSelectedText>{selectedText}</StyledSelectedText>
                  <p style={{ textAlign: "right" }}>
                    {selectedText?.length}/{editorCurrentTaskInput.userText.max}{" "}
                    Max Characters
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
                          disabled={!isOk}
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
              </ScollingTool>
            </Collapse>
          </ToolsSection>
          <BlogResetModal quill={quill} id={AI_COMPLETE_BLOG_WRITER} />
        </BlogContainer>
      )}
      {subscriber?.usage && <SubscriberModal />}
    </Layout>
  );
};

const BlogContainer = styled.div`
  display: flex;
  min-height: 100vh;
  // padding: 0 15px;

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
  max-height: 100vh;
  overflow-y: scroll;

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
  padding: 22px 15px 22px 15px;
  font-size: 25px;
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

export default CompleteBlogGenerator;
