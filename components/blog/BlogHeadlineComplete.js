import { useState } from "react";
import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import {
  postBlogContents,
  setCurrentTask,
  setBlogHeadline,
  selectors as blogSelector,
} from "@/redux/slices/completeBlog";
import { setAccessTask } from "@/redux/slices/ui";
import ToolTitleItem from "./components/ToolTitleItem";
import { ToolItem, TextItem } from "./styles";
import { BLOG_HEADLINE } from "@/appconstants";
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
  const { about, loading, headline, currenttask } = useSelector(
    blogSelector.getCompleteBlogContent
  );
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
      about: about.input,
      numberOfSuggestions: suggestionNum,
    });

    if (isValid) {
      dispatch(setCurrentTask(BLOG_HEADLINE));
      dispatch(
        postBlogContents({
          task: BLOG_HEADLINE,
          data: { ...values },
        })
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
