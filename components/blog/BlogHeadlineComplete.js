import { useState } from "react";
import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  postBlogContents,
  setCurrentTask,
  setBlogHeadline,
  selectors as blogSelector,
} from "@/redux/slices/completeBlog";
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
  const { about, loading, headline, currenttask } = useSelector(
    blogSelector.getCompleteBlogContent
  );
  const { isAuth } = useUser();
  const showSubscriberModal = useSubscriberModal();

  const trimedAbout = about.input.trim();
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

        dispatch(setCurrentTask(BLOG_HEADLINE));
        dispatch(
          postBlogContents({
            task: BLOG_HEADLINE,
            data: {
              task: BLOG_HEADLINE,
              about: about.input,
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

  return (
    <ToolItem>
      <ToolTitleItem
        id="complete-blog"
        text="Blog Headline"
        isActive={true}
        currentTask={BLOG_HEADLINE}
      />

      <Collapse isOpen={true}>
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
          <GenerateButton
            loading={currenttask === BLOG_HEADLINE && loading === "pending"}
            onClick={handleBlogHeadline}
          />
          {headline.items.length > 0 &&
            headline.items.map((item, index) => (
              <TextItem
                onClick={() => dispatch(setBlogHeadline({ input: item }))}
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
