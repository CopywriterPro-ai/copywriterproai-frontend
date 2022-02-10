import { useState } from "react";
import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  postBlogContents,
  setStateBlogTitle,
  selectors as blogSelector,
} from "@/redux/slices/blog";
import { setSigninModal, setSubscriberUsageModal } from "@/redux/slices/ui";
import ToolTitleItem from "./components/ToolTitleItem";
import { ToolItem, TextItem } from "./styles";
import { BLOG_HEADLINE } from "@/appconstants";
import { toastMessage } from "@/utils";
import { useUser, useSubscriberModal } from "@/hooks";
import { ToolAction, ToolInput } from "./styles";
import GenerateButton from "./components/GenerateButton";

const BlogHeadline = ({ aboutRef }) => {
  const dispatch = useDispatch();
  const [suggestionNum, setSuggestionNum] = useState(1);
  const { isCurrentTask, isEmpty, items, loading } = useSelector(
    blogSelector.getBlogItem(BLOG_HEADLINE)
  );
  const { about } = useSelector(blogSelector.getBlogContent);
  const { isAuth } = useUser();
  const showSubscriberModal = useSubscriberModal();

  const validAbout = about.trim().length > 0;

  const handleSubscriberModalOpen = (message) => {
    dispatch(setSubscriberUsageModal({ usage: true, message }));
  };

  const handleBlogHeadline = () => {
    if (validAbout) {
      if (isAuth) {
        if (showSubscriberModal) {
          return handleSubscriberModalOpen();
        }

        dispatch(
          postBlogContents({
            task: BLOG_HEADLINE,
            data: {
              task: BLOG_HEADLINE,
              about: about,
              numberOfSuggestions: suggestionNum,
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

  return (
    <ToolItem>
      <ToolTitleItem
        text="Blog Headline"
        isActive={isCurrentTask}
        currentTask={BLOG_HEADLINE}
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
          <GenerateButton loading={loading} onClick={handleBlogHeadline} />
          {!isEmpty &&
            items.map((item, index) => (
              <TextItem
                onClick={() => dispatch(setStateBlogTitle(item))}
                key={index}
              >
                {item}
              </TextItem>
            ))}
        </ToolAction>
      </Collapse>
    </ToolItem>
  );
};

export default BlogHeadline;
