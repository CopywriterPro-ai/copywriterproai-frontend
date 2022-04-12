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
import { BLOG_INTRO, BLOG_OUTLINE } from "@/appconstants";
import { yupValidate } from "@/utils";
import { useSubscriberModal, useToolAccess } from "@/hooks";
import { ToolAction, ToolInput } from "./styles";
import GenerateButton from "./components/GenerateButton";

const schemaValidation = {
  blogIntro: {
    task: yup.string().required(),
    headline: yup.string().required().min(10).max(150).label("Blog headline"),
    about: yup.string().min(10).max(200).required().label("Blog about"),
    numberOfSuggestions: yup
      .number()
      .min(1)
      .required()
      .label("Number of Suggestions"),
  },
};

const BlogIntro = ({ titleRef, aboutRef, quillRef }) => {
  const dispatch = useDispatch();
  const [suggestionNum, setSuggestionNum] = useState(1);
  const { isCurrentTask, isEmpty, items, loading } = useSelector(
    writeAlongSelector.getContentItem(BLOG_INTRO)
  );
  const { headline, about } = useSelector(writeAlongSelector.getWriteAlong);

  const [accessBlogIntro] = useToolAccess([BLOG_INTRO]);
  const [showSubscriberModal, setShowSubscriberModal] = useSubscriberModal();

  const handleBlogIntro = () => {
    if (showSubscriberModal.block) {
      setShowSubscriberModal({ ...showSubscriberModal, isOpen: true });
      return;
    }

    if (!accessBlogIntro) {
      dispatch(
        setAccessTask({ isOpen: true, message: "please upgrade your plan" })
      );
      return;
    }

    const { isValid, values } = yupValidate(schemaValidation.blogIntro, {
      task: BLOG_INTRO,
      headline: headline.item,
      numberOfSuggestions: suggestionNum,
      about: about.item,
    });

    if (isValid) {
      dispatch(
        postWriteAlongContents({
          task: BLOG_INTRO,
          data: { ...values },
        })
      );
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
