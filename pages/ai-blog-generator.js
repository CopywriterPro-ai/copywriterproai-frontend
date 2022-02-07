import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { UserLayout as Layout } from "@/layout";
import EditorJS from "@/components/editor";
import CustomToolbar from "@/components/editor/CustomToolbar";
import {
  BlogHeadline,
  BlogIntro,
  BlogOutline,
  BlogOutro,
} from "@/components/blog";
import {
  setStateBlogAbout,
  setStateBlogTitle,
  setCurrentToolContent,
  createBlog,
  updateBlog,
  selectors as blogSelector,
} from "@/redux/slices/blog";
import {
  setBlogResetModal,
  setSigninModal,
  selectors as uiSelector,
} from "@/redux/slices/ui";
import {
  useBeforeunload,
  useUser,
  useSidebar,
  useWarnIfUnsavedChanges,
} from "@/hooks";
import { SubscriberModal } from "@/components/modals/subscriber";
import { BlogResetModal } from "@/components/modals/blogs";
import { MainSidebar } from "@/components/sidebar";
import TipsImg from "@/assets/images/generate-tips.png";
import { toastMessage } from "@/utils";

const BlogGenerator = () => {
  const dispatch = useDispatch();

  const aboutRef = useRef(null);
  const titleRef = useRef(null);

  const [quill, setQuill] = useState(null);
  const [index, setIndex] = useState(0);

  const { about, title } = useSelector(blogSelector.getBlogContent);
  const { value, range } = useSelector(blogSelector.getEditor());
  const { item: toolItem } = useSelector(blogSelector.getToolContent());
  const { currentid: currentBlogId } = useSelector(blogSelector.getBlogs());
  const isUpdateChange = useSelector(blogSelector.isUpdateChange());
  const { subscriber } = useSelector(uiSelector.getModal);
  const { isAuth } = useUser();
  const { showSidebar, showContent } = useSidebar();

  useBeforeunload((event) => {
    if (isUpdateChange) {
      event.preventDefault();
    }
  });

  useWarnIfUnsavedChanges(isUpdateChange);

  const isNewBlog = currentBlogId === "";
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    const last = range ? range?.index : 0;
    setLastIndex(last);
  }, [range]);

  useEffect(() => {
    let interval;
    if (quill && toolItem.length) {
      const toolItemArr = toolItem?.split(" ");
      const toolItemArrLength = toolItemArr.length;

      interval = setInterval(() => {
        if (toolItemArrLength > index) {
          let word = toolItemArr[index];
          quill.enable(false);
          quill.insertText(lastIndex, ` ${word}`);
          setIndex(index + 1);
          setLastIndex(lastIndex + word.length + 1);
        } else {
          clearInterval(interval);
          setIndex(0);
          dispatch(setCurrentToolContent(""));
          quill.enable();
        }
      }, 1);
    }
    return () => {
      if (quill) {
        clearInterval(interval);
      }
    };
  }, [dispatch, index, lastIndex, quill, toolItem]);

  const handleChangeBlogAbout = (e) => {
    dispatch(setStateBlogAbout(e.target.value));
  };

  const handleChangeTitle = (e) => {
    dispatch(setStateBlogTitle(e.target.value));
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
              name="title"
              value={title}
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
                  value={about}
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
            </ScollingTool>
          </ToolsSection>
          <BlogResetModal />
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
