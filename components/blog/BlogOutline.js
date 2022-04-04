import { useState, useEffect } from "react";
import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  postWriteAlongContents,
  writeAlongActions,
  selectors as writeAlongSelector,
} from "@/redux/slices/blog";
import { setSigninModal, setSubscriberUsageModal } from "@/redux/slices/ui";
import ToolTitleItem from "./components/ToolTitleItem";
import { ToolItem, TextItem, ToolAction, ToolInput } from "./styles";
import { BLOG_OUTLINE, BLOG_FROM_OUTLINE } from "@/appconstants";
import { toastMessage } from "@/utils";
import {
  useUser,
  useSubscriberModal,
  useQuillConentTypingInsert,
  useToolAccess,
} from "@/hooks";
import GenerateButton from "./components/GenerateButton";

const BlogOutline = ({ aboutRef, quillRef }) => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState(5);
  const [suggestionNum, setSuggestionNum] = useState(1);
  const [currentOutlineIndex, setCurrentOutlineIndex] = useState(null);

  const { outline, about, headline, intro, outlineblog } = useSelector(
    writeAlongSelector.getWriteAlong
  );
  const { isCurrentTask } = useSelector(
    writeAlongSelector.getContentItem(BLOG_OUTLINE)
  );
  const { isAuth } = useUser();
  const showSubscriberModal = useSubscriberModal();
  const isTyping = useQuillConentTypingInsert(quillRef, outlineblog.item);
  const [accessBlogOutline] = useToolAccess([BLOG_OUTLINE]);

  const handleSubscriberModalOpen = (message) => {
    dispatch(setSubscriberUsageModal({ usage: true, message }));
  };

  useEffect(() => {
    if (!isTyping) {
      dispatch(writeAlongActions.setOutlineBlog({ item: "" }));
    }
  }, [dispatch, isTyping]);

  const handleBlogOutline = () => {
    if (about.item.trim().length && headline.item.trim().length) {
      if (isAuth && accessBlogOutline) {
        if (showSubscriberModal) {
          return handleSubscriberModalOpen();
        }

        dispatch(
          postWriteAlongContents({
            task: BLOG_OUTLINE,
            data: {
              task: BLOG_OUTLINE,
              headline: headline.item,
              numberOfPoints: number,
              numberOfSuggestions: suggestionNum,
              about: about.item,
            },
          })
        );
      } else {
        dispatch(setSigninModal(true));
      }
    } else {
      aboutRef.current?.focus();
      toastMessage.customWarn("Blog about required", 3000, {
        toastId: "about",
      });
    }
  };

  const handleWriteMore = (outline, index) => {
    setCurrentOutlineIndex(index);
    dispatch(
      postWriteAlongContents({
        task: BLOG_FROM_OUTLINE,
        data: {
          task: BLOG_FROM_OUTLINE,
          headline: headline.item,
          intro: intro.item,
          outline,
        },
      })
    );
  };

  const isLoading = outlineblog.loading === "pending";

  return (
    <ToolItem>
      <ToolTitleItem
        text="Blog Outline"
        isActive={isCurrentTask}
        currentTask={BLOG_OUTLINE}
      />
      <Collapse isOpen={isCurrentTask}>
        <ToolAction>
          <ToolInput>
            <p>Number of Points</p>
            <input
              type="number"
              min={3}
              max={10}
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />
          </ToolInput>
          <ToolInput>
            <p>Number of Suggestions</p>
            <input
              type="number"
              min={1}
              max={10}
              onChange={(e) => setSuggestionNum(e.target.value)}
              value={suggestionNum}
            />
          </ToolInput>
          <GenerateButton
            onClick={handleBlogOutline}
            loading={outline.loading === "pending"}
          />
          {outline.items.map((item, index) => {
            const texts = item.trim()?.split("\n");
            const clickedIndex = currentOutlineIndex === index;
            return (
              <TextItem key={index} style={{ cursor: "default" }}>
                <ol>
                  {texts.map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ol>
                <div style={{ textAlign: "center" }}>
                  <StyledWriteMore
                    style={isLoading ? { cursor: "not-allowed" } : {}}
                    onClick={() => !isLoading && handleWriteMore(texts, index)}
                  >
                    {isLoading && clickedIndex ? "Creating..." : "Write more"}
                  </StyledWriteMore>
                </div>
              </TextItem>
            );
          })}
        </ToolAction>
      </Collapse>
    </ToolItem>
  );
};

const StyledWriteMore = styled.button`
  background-color: white;
  border: 1.5px solid #3a4841;
  padding: 2px 10px;
  border-radius: 3px;
  font-size: 15px;
  line-height: 22px;
  user-select: none;
`;

export default BlogOutline;
