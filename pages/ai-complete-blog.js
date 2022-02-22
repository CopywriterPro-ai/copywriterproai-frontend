import { useRef, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Collapse } from "reactstrap";

import { UserLayout as Layout } from "@/layout";
import EditorJS from "@/components/completeblogeditor";
import CustomToolbar from "@/components/editor/CustomToolbar";
import { BlogHeadlineComplete } from "@/components/blog";
import {
  createBlog,
  updateBlog,
  setBlogHeadline,
  setBlogAbout,
  postBlogContents,
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
  useUser,
  useSidebar,
  useQuillConentInsert,
} from "@/hooks";
import { SubscriberModal } from "@/components/modals/subscriber";
import { BlogResetModal } from "@/components/modals/blogs";
import { MainSidebar } from "@/components/sidebar";
import GenerateButton from "@/components/blog/components/GenerateButton";
import TipsImg from "@/assets/images/generate-tips.png";
import { toastMessage } from "@/utils";
import { AI_COMPLETE_BLOG_WRITER, BLOG_WRITING } from "@/appconstants";

const CompleteBlogGenerator = () => {
  const dispatch = useDispatch();
  const aboutRef = useRef(null);
  const headlineRef = useRef(null);
  const [quill, setQuill] = useState(null);

  const { subscriber } = useSelector(uiSelector.getModal);
  const { about, headline, currenttask, loading, complete } = useSelector(
    blogSelector.getCompleteBlogContent
  );
  const { isAuth } = useUser();
  const { showSidebar, showContent } = useSidebar();
  const isNewBlog = true;

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
                <button onClick={handleSaveOrUpdate}>Save</button>
              </ToolBottom>
            </ScollingTool>
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
