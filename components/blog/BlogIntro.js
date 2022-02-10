import { useState } from "react";
import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  postBlogContents,
  setStateBlogIntro,
  selectors as blogSelector,
} from "@/redux/slices/blog";
import { setSigninModal, setSubscriberUsageModal } from "@/redux/slices/ui";
import ToolTitleItem from "./components/ToolTitleItem";
import { ToolItem, TextItem } from "./styles";
import { BLOG_INTRO } from "@/appconstants";
import { toastMessage } from "@/utils";
import { useUser, useSubscriberModal } from "@/hooks";
import { ToolAction, ToolInput } from "./styles";
import GenerateButton from "./components/GenerateButton";

const BlogIntro = ({ titleRef, aboutRef, quillRef }) => {
  const dispatch = useDispatch();
  const [suggestionNum, setSuggestionNum] = useState(1);
  const { isCurrentTask, isEmpty, items, loading } = useSelector(
    blogSelector.getBlogItem(BLOG_INTRO)
  );
  const { title, about } = useSelector(blogSelector.getBlogContent);

  const { isAuth } = useUser();
  const showSubscriberModal = useSubscriberModal();

  const validTitle = title.trim().length > 0;
  const validAbout = about.trim().length > 0;

  const handleSubscriberModalOpen = (message) => {
    dispatch(setSubscriberUsageModal({ usage: true, message }));
  };

  const handleBlogIntro = () => {
    if (validTitle && validAbout) {
      if (isAuth) {
        if (showSubscriberModal) {
          return handleSubscriberModalOpen();
        }

        dispatch(
          postBlogContents({
            task: BLOG_INTRO,
            data: {
              task: BLOG_INTRO,
              headline: title,
              numberOfSuggestions: suggestionNum,
              about,
            },
          })
        );
      } else {
        dispatch(setSigninModal(true));
      }
    } else {
      if (!validTitle) {
        titleRef.current?.focus();
        toastMessage.customWarn("Blog headline required", 3000, {
          toastId: "headline",
        });
      } else if (!validAbout) {
        aboutRef.current?.focus();
        toastMessage.customWarn("Blog about required", 3000, {
          toastId: "about",
        });
      }
    }
  };

  const handleSelectBlogIntro = (item) => {
    dispatch(setStateBlogIntro(item));
    quillRef.setText(item);
  };

  return (
    <ToolItem>
      <ToolTitleItem
        text="Blog Intro"
        isActive={isCurrentTask}
        currentTask={BLOG_INTRO}
      />

      <Collapse isOpen={isCurrentTask}>
        <ToolAction>
          <ToolInput>
            <p>Number of Suggestions</p>
            <input
              type="number"
              min={1}
              max={5}
              onChange={(e) => setSuggestionNum(e.target.value)}
              value={suggestionNum}
            />
          </ToolInput>
          <GenerateButton loading={loading} onClick={handleBlogIntro} />
          {!isEmpty &&
            items.map((item, index) => (
              <TextItem onClick={() => handleSelectBlogIntro(item)} key={index}>
                {item}
              </TextItem>
            ))}
        </ToolAction>
      </Collapse>
    </ToolItem>
  );
};

export default BlogIntro;
