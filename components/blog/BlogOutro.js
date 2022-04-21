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
import { BLOG_OUTRO, BLOG_HEADLINE } from "@/appconstants";
import * as MESSAGE from "@/appconstants/message";
import { yupValidate } from "@/utils";
import { useSubscriberModal, useToolAccess, useWriterAccess } from "@/hooks";
import { ToolAction, ToolInput } from "./styles";
import GenerateButton from "./components/GenerateButton";

const schemaValidation = {
  blogOutro: {
    task: yup.string().required(),
    headline: yup
      .string()
      .required(
        "Generate or Write the Blog Headline first and then generate the Blog Outro."
      )
      .min(10, "Blog Headline must be at least 10 characters long.")
      .max(150, "Blog Headline must be less than or equal 150 characters."),
    about: yup
      .string()
      .required("Write the Blog About first and then generate the Blog Outro.")
      .min(10, "Blog About must be at least 10 characters long.")
      .max(200, "Blog About must be less than or equal 200 characters."),
    numberOfSuggestions: yup
      .number()
      .required()
      .min(1)
      .max(10)
      .label("Number of suggestions"),
  },
};

const BlogOutro = ({ titleRef, aboutRef, quillRef }) => {
  const dispatch = useDispatch();
  const [suggestionNum, setSuggestionNum] = useState(1);
  const { isCurrentTask, isEmpty, items, loading } = useSelector(
    writeAlongSelector.getContentItem(BLOG_OUTRO)
  );
  const { headline, about } = useSelector(writeAlongSelector.getWriteAlong);

  const [showSubscriberModal, setShowSubscriberModal] = useSubscriberModal();
  const [accessBlogOutro] = useToolAccess([BLOG_OUTRO]);
  const hasWriterAccess = useWriterAccess();

  const handleBlogOutro = () => {
    if (showSubscriberModal.block) {
      setShowSubscriberModal({ ...showSubscriberModal, isOpen: true });
      return;
    }

    if (!accessBlogOutro && !hasWriterAccess) {
      dispatch(
        setAccessTask({
          isOpen: true,
          message: MESSAGE.WRITING_TOOLS_NOT_ACCESS,
        })
      );
      return;
    }

    const { isValid, values } = yupValidate(schemaValidation.blogOutro, {
      task: BLOG_OUTRO,
      headline: headline.item,
      numberOfSuggestions: suggestionNum,
      about: about.item,
    });

    if (isValid) {
      dispatch(
        postWriteAlongContents({
          task: BLOG_OUTRO,
          data: { ...values },
        })
      );
    }
  };

  const handleSelectItem = (item) => {
    const lastIndex = quillRef.getLength();
    quillRef.insertText(lastIndex, item);
    dispatch(writeAlongActions.setOutro({ item }));
    dispatch(writeAlongActions.setCurrentTask(BLOG_HEADLINE));
  };

  return (
    <ToolItem>
      <ToolTitleItem
        text="Blog Outro"
        isActive={isCurrentTask}
        currentTask={BLOG_OUTRO}
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
          <GenerateButton loading={loading} onClick={handleBlogOutro} />
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

export default BlogOutro;
