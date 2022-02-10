import { useState } from "react";
import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  postBlogContents,
  setStateBlogOutline,
  selectors as blogSelector,
} from "@/redux/slices/blog";
import { setSigninModal, setSubscriberUsageModal } from "@/redux/slices/ui";
import ToolTitleItem from "./components/ToolTitleItem";
import { ToolItem, TextItem, ToolAction, ToolInput } from "./styles";
import { BLOG_OUTLINE } from "@/appconstants";
import { toastMessage } from "@/utils";
import { useUser, useSubscriberModal } from "@/hooks";
import GenerateButton from "./components/GenerateButton";

const BlogOutline = ({ aboutRef, quillRef }) => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState(5);
  const [suggestionNum, setSuggestionNum] = useState(1);

  const { isCurrentTask, items, loading } = useSelector(
    blogSelector.getBlogItem(BLOG_OUTLINE)
  );
  const { about, title } = useSelector(blogSelector.getBlogContent);
  const { isAuth } = useUser();
  const showSubscriberModal = useSubscriberModal();
  const validAbout = about.trim().length > 0;

  const handleSubscriberModalOpen = (message) => {
    dispatch(setSubscriberUsageModal({ usage: true, message }));
  };

  const handleBlogOutline = () => {
    if (validAbout) {
      if (isAuth) {
        if (showSubscriberModal) {
          return handleSubscriberModalOpen();
        }

        dispatch(
          postBlogContents({
            task: BLOG_OUTLINE,
            data: {
              task: BLOG_OUTLINE,
              headline: title,
              numberOfPoints: number,
              numberOfSuggestions: suggestionNum,
              about,
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

  const handleSelectBlogOutline = (item) => {
    dispatch(setStateBlogOutline(item));
    item = item
      .split("\n")
      .map((text) => text + "\n")
      .join("\n");
    const quillLastIndex = quillRef.getLength();
    quillRef.insertText(quillLastIndex - 2, `\n\n${item}`, "bold", true);
  };

  return (
    <ToolItem>
      <ToolTitleItem
        text="Blog Outline"
        isActive={isCurrentTask}
        isOutline={true}
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
          <GenerateButton loading={loading} onClick={handleBlogOutline} />
          {items.map((item, index) => {
            const texts = item.trim()?.split("\n");
            return (
              <TextItem
                onClick={() => handleSelectBlogOutline(item)}
                key={index}
              >
                <ol>
                  {texts.map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ol>
              </TextItem>
            );
          })}
        </ToolAction>
      </Collapse>
    </ToolItem>
  );
};

export default BlogOutline;
