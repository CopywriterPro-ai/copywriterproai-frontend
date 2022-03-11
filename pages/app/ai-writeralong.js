import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState, useCallback } from "react";

import { BlogHeadline, BlogIntro, BlogOutro } from "@/components/blog";
import EditorJS from "@/components/editor";
import CustomToolbar from "@/components/editor/CustomToolbar";
import { BlogResetModal } from "@/components/modals/blogs";
import { SubscriberModal } from "@/components/modals/subscriber";
import { MainSidebar } from "@/components/sidebar";
import {
  useSidebar,
  useUser,
  useQuillValueIsChange,
  useBeforeunload,
  useWarnIfUnsavedChanges,
} from "@/hooks";
import { UserLayout as Layout } from "@/layout";
import {
  selectors as uiSelector,
  setBlogResetModal,
  setSigninModal,
} from "@/redux/slices/ui";
import {
  writerAlongActions,
  selectors as writerAlongSelector,
} from "@/redux/slices/blog";
import {
  resetBlogsDraft,
  createBlog,
  updateBlog,
  selectors as draftSelector,
} from "@/redux/slices/draft";
import { toastMessage } from "@/utils";
import { AI_BLOG_WRITER } from "@/appconstants";
import TipsImg from "@/assets/images/generate-tips.png";

const BlogGenerator = () => {
  const dispatch = useDispatch();

  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const [quill, setQuill] = useState(null);

  const { about, headline } = useSelector(writerAlongSelector.getWriterAlong);
  const { value } = useSelector(writerAlongSelector.getEditor());
  const { activeId } = useSelector(draftSelector.getDraftBlogs());
  const { subscriber } = useSelector(uiSelector.getModal);
  const { isAuth } = useUser();
  const { showSidebar, showContent } = useSidebar();
  const { isEditorChange } = useQuillValueIsChange(quill);

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
    dispatch(writerAlongActions.resetBlog());
  }, [dispatch, quill]);

  useEffect(() => {
    return () => {
      handleEditorReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeBlogAbout = (e) => {
    dispatch(writerAlongActions.setAbout({ item: e.target.value }));
  };

  const handleChangeTitle = (e) => {
    dispatch(writerAlongActions.setHeadline({ item: e.target.value }));
  };

  const handleResetBlog = () => {
    dispatch(setBlogResetModal(true));
  };

  const isValidatedOk = (toastId) => {
    let isValid = false;
    const headlineLength = headline.item.trim().length;
    const aboutLength = about.item.trim().length;
    const bodyLength = quill.getLength();

    if (headlineLength < 10 || headlineLength > 200) {
      isValid = false;
      toastMessage.customWarn(
        "Blog headline must be between 10 and 200 characters",
        3000,
        { toastId }
      );
    } else if (aboutLength < 10 || aboutLength > 200) {
      isValid = false;
      toastMessage.customWarn(
        "Blog about must be between 10 and 200 characters",
        3000,
        { toastId }
      );
    } else if (bodyLength < 10 || bodyLength > 200) {
      isValid = false;
      toastMessage.customWarn(
        "Blog content must be between 10 and 200 characters",
        3000,
        { toastId }
      );
    } else {
      isValid = true;
    }
    return isValid;
  };

  const handleSaveOrUpdate = () => {
    if (!isNewBlog) {
      if (!isValidatedOk("updateBlog")) {
        return;
      }

      if (isAuth) {
        dispatch(
          updateBlog({
            id: activeId,
            data: {
              blogAbout: about.item,
              headline: headline.item,
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
      if (!isValidatedOk("createBlog")) {
        return;
      }

      if (isAuth) {
        dispatch(
          createBlog({
            data: {
              blogAbout: about.item,
              headline: headline.item,
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
              <ToolsHeader>
                <Tips>
                  <TipsIcon src={TipsImg.src} alt="tips" />
                  <span>
                    The results depend on the information you input. So be sure
                    to spend some time making it as specific as possible.
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
                {/* <BlogOutline aboutRef={aboutRef} quillRef={quill} /> */}
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
            </ScollingTool>
          </ToolsSection>
          <BlogResetModal quill={quill} id={AI_BLOG_WRITER} />
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

export default BlogGenerator;
