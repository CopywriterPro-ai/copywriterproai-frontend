import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  postBlogContents,
  setStateBlogIntro,
  selectors as blogSelector,
} from "@/redux/slices/blog";
import { setSigninModal } from "@/redux/slices/ui";
import ToolTitleItem from "./ToolTitleItem";
import { ToolItem, TextItem } from "./styles";
import { BLOG_INTRO } from "@/appconstants";
import { toastMessage } from "@/utils";
import { useUser } from "@/hooks";

const BlogIntro = ({ titleRef, aboutRef, quillRef }) => {
  const dispatch = useDispatch();

  const { isCurrentTask, isEmpty, items, loading } = useSelector(
    blogSelector.getBlogItem(BLOG_INTRO)
  );
  const { title, about } = useSelector(blogSelector.getBlogContent);

  const { isAuth } = useUser();

  const validTitle = title.trim().length > 0;
  const validAbout = about.trim().length > 0;

  const handleBlogIntro = () => {
    if (validTitle && validAbout) {
      if (isAuth) {
        dispatch(
          postBlogContents({
            task: BLOG_INTRO,
            data: {
              task: BLOG_INTRO,
              title,
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
        loading={loading}
        text="Blog Intro"
        isActive={isCurrentTask}
        onClick={handleBlogIntro}
        currentTask={BLOG_INTRO}
      />

      <Collapse isOpen={isCurrentTask && !isEmpty}>
        {items.map((item, index) => (
          <TextItem onClick={() => handleSelectBlogIntro(item)} key={index}>
            {item}
          </TextItem>
        ))}
      </Collapse>
    </ToolItem>
  );
};

export default BlogIntro;
