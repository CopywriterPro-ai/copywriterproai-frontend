import { useState } from "react";
import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import {
  postWriteAlongContents,
  writeAlongActions,
  selectors as writeAlongSelector,
} from "@/redux/slices/blog";
import { setAccessTask } from "@/redux/slices/ui";
import ToolTitleItem from "./components/ToolTitleItem";
import { ToolItem, TextItem } from "./styles";
import { BLOG_HEADLINE, BLOG_INTRO } from "@/appconstants";
import { yupValidate } from "@/utils";
import { useSubscriberModal, useToolAccess } from "@/hooks";
import { ToolAction, ToolInput } from "./styles";
import GenerateButton from "./components/GenerateButton";

const schemaValidation = {
  blogHeadline: {
    task: yup.string().required(),
    about: yup.string().min(10).max(200).required().label("Blog about"),
    numberOfSuggestions: yup
      .number()
      .min(1)
      .required()
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

  const handleBlogHeadline = () => {
    if (showSubscriberModal.block) {
      setShowSubscriberModal({ ...showSubscriberModal, isOpen: true });
      return;
    }

    if (!accessBlogHeadline) {
      dispatch(
        setAccessTask({ isOpen: true, message: "please upgrade your plan" })
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
