import { useState } from "react";
import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import {
  postWriteAlongContents,
  writeAlongActions,
  selectors as writeAlongSelector,
} from "@/redux/slices/blog";
import { setAccessTask, setSigninModal } from "@/redux/slices/ui";
import ToolTitleItem from "./components/ToolTitleItem";
import { ToolItem, TextItem } from "./styles";
import { BLOG_HEADLINE, BLOG_INTRO } from "@/appconstants";
import * as MESSAGE from "@/appconstants/message";
import { yupValidate } from "@/utils";
import { useUser, useSubscriberModal, useToolAccess, useWriterAccess } from "@/hooks";
import { ToolAction, ToolInput } from "./styles";
import GenerateButton from "./components/GenerateButton";

const schemaValidation = {
  blogHeadline: {
    task: yup.string().required(),
    about: yup
      .string()
      .required(
        "Write the Blog About first and then generate the blog headline."
      )
      .min(10, "Your Blog About must be at least 10 characters long.")
      .max(200, "Your Blog About must be less than or equal 200 characters."),
    numberOfSuggestions: yup
      .number()
      .required()
      .min(1)
      .max(10)
      .label("Number of Suggestions"),
  },
};

const BlogHeadline = ({ aboutRef }) => {
  const dispatch = useDispatch();
  const [suggestionNum, setSuggestionNum] = useState(1);
  const { isCurrentTask, isEmpty, items, loading } = useSelector(
    writeAlongSelector.getContentItem(BLOG_HEADLINE)
  );
  const { about } = useSelector(writeAlongSelector.getWriteAlong);
  const [accessBlogHeadline] = useToolAccess([BLOG_HEADLINE]);
  const [showSubscriberModal, setShowSubscriberModal] = useSubscriberModal();
  const hasWriterAccess = useWriterAccess();
  const {
    isAuth,
    subscribe: {
      freeTrial: { eligible: freeTrailEligible },
      activeSubscription: { words, subscription },
    },
  } = useUser();

  const handleBlogHeadline = () => {
    if (!isAuth) {
      dispatch(setSigninModal(true));
      return;
    }

    if (showSubscriberModal.block) {
      setShowSubscriberModal({ ...showSubscriberModal, isOpen: true });
      return;
    }

    if (!accessBlogHeadline && !hasWriterAccess) {
      dispatch(
        setAccessTask({
          isOpen: true,
          message: MESSAGE.WRITING_TOOLS_NOT_ACCESS,
        })
      );
      return;
    }

    const { isValid, values } = yupValidate(schemaValidation.blogHeadline, {
      task: BLOG_HEADLINE,
      about: about.item,
      numberOfSuggestions: suggestionNum,
    });

    if (isValid) {
      dispatch(
        postWriteAlongContents({
          task: BLOG_HEADLINE,
          data: { ...values },
        })
      );
    }
  };

  const handleSelectItem = (item) => {
    dispatch(writeAlongActions.setHeadline({ item }));
    dispatch(writeAlongActions.setCurrentTask(BLOG_INTRO));
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
