import { useState } from "react";
import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  postWriterAlongContents,
  writerAlongActions,
  selectors as writerAlongSelector,
} from "@/redux/slices/blog";
import { setSigninModal, setSubscriberUsageModal } from "@/redux/slices/ui";
import ToolTitleItem from "./components/ToolTitleItem";
import { ToolItem, TextItem } from "./styles";
import { BLOG_HEADLINE, BLOG_INTRO } from "@/appconstants";
import { toastMessage } from "@/utils";
import { useUser, useSubscriberModal } from "@/hooks";
import { ToolAction, ToolInput } from "./styles";
import GenerateButton from "./components/GenerateButton";

const BlogHeadline = ({ aboutRef }) => {
  const dispatch = useDispatch();
  const [suggestionNum, setSuggestionNum] = useState(1);
  const { isCurrentTask, isEmpty, items, loading } = useSelector(
    writerAlongSelector.getContentItem(BLOG_HEADLINE)
  );
  const { about } = useSelector(writerAlongSelector.getWriterAlong);
  const { isAuth } = useUser();
  const showSubscriberModal = useSubscriberModal();

  const trimedAbout = about.item.trim();
  const validAbout = trimedAbout.length >= 10 && trimedAbout.length <= 200;

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
          postWriterAlongContents({
            task: BLOG_HEADLINE,
            data: {
              task: BLOG_HEADLINE,
              about: about.item,
              numberOfSuggestions: suggestionNum,
            },
          })
        );
      } else {
        dispatch(setSigninModal(true));
      }
    } else {
      aboutRef.current?.focus();
      toastMessage.customWarn(
        "Blog about need must be min 10 and max 200 characters",
        3000,
        {
          toastId: "about",
        }
      );
    }
  };

  const handleSelectItem = (item) => {
    dispatch(writerAlongActions.setHeadline({ item }));
    dispatch(writerAlongActions.setCurrentTask(BLOG_INTRO));
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
              <TextItem onClick={() => handleSelectItem(item)} key={index}>
                {item}
              </TextItem>
            ))}
        </ToolAction>
      </Collapse>
    </ToolItem>
  );
};

export default BlogHeadline;
