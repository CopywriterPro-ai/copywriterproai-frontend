import { useState } from "react";
import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  postWriteAlongContents,
  writeAlongActions,
  selectors as writeAlongSelector,
} from "@/redux/slices/blog";
import { setSigninModal, setSubscriberUsageModal } from "@/redux/slices/ui";
import ToolTitleItem from "./components/ToolTitleItem";
import { ToolItem, TextItem } from "./styles";
import { BLOG_INTRO, BLOG_OUTLINE } from "@/appconstants";
import { toastMessage } from "@/utils";
import { useUser, useSubscriberModal, useToolAccess } from "@/hooks";
import { ToolAction, ToolInput } from "./styles";
import GenerateButton from "./components/GenerateButton";

const BlogIntro = ({ titleRef, aboutRef, quillRef }) => {
  const dispatch = useDispatch();
  const [suggestionNum, setSuggestionNum] = useState(1);
  const { isCurrentTask, isEmpty, items, loading } = useSelector(
    writeAlongSelector.getContentItem(BLOG_INTRO)
  );
  const { headline, about } = useSelector(writeAlongSelector.getWriteAlong);

  const { isAuth } = useUser();
  const showSubscriberModal = useSubscriberModal();

  const trimedHeadline = headline.item.trim();
  const trimedAbout = about.item.trim();
  const validHeadline =
    trimedHeadline.length >= 10 && trimedHeadline.length <= 150;
  const validAbout = trimedAbout.length >= 10 && trimedAbout.length <= 200;

  const [accessBlogIntro] = useToolAccess([BLOG_INTRO]);

  const handleSubscriberModalOpen = (message) => {
    dispatch(setSubscriberUsageModal({ usage: true, message }));
  };

  const handleBlogIntro = () => {
    if (validHeadline && validAbout) {
      if (isAuth && accessBlogIntro) {
        if (showSubscriberModal) {
          return handleSubscriberModalOpen();
        }

        dispatch(
          postWriteAlongContents({
            task: BLOG_INTRO,
            data: {
              task: BLOG_INTRO,
              headline: headline.item,
              numberOfSuggestions: suggestionNum,
              about: about.item,
            },
          })
        );
      } else {
        dispatch(setSigninModal(true));
      }
    } else {
      if (!validHeadline) {
        titleRef.current?.focus();
        toastMessage.customWarn(
          "Blog headline length need must be min 10 and max 150 characters",
          3000,
          {
            toastId: "headline",
          }
        );
      } else if (!validAbout) {
        aboutRef.current?.focus();
        toastMessage.customWarn(
          "Blog about need must be min 10 and max 200 characters",
          3000,
          {
            toastId: "about",
          }
        );
      }
    }
  };

  const handleSelectItem = (item) => {
    const lastIndex = quillRef.getLength();
    quillRef.insertText(lastIndex, item);
    dispatch(writeAlongActions.setIntro({ item }));
    dispatch(writeAlongActions.setCurrentTask(BLOG_OUTLINE));
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
              <TextItem onClick={() => handleSelectItem(item)} key={index}>
                {item}
              </TextItem>
            ))}
        </ToolAction>
      </Collapse>
    </ToolItem>
  );
};

export default BlogIntro;
