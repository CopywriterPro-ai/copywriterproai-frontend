import React from "react";
import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  postBlogContents,
  setStateBlogTitle,
  selectors as blogSelector,
} from "@/redux/slices/blog";
import { setSigninModal, setSubscriberUsageModal } from "@/redux/slices/ui";
import ToolTitleItem from "./ToolTitleItem";
import { ToolItem, TextItem } from "./styles";
import { BLOG_HEADLINE } from "@/appconstants";
import { toastMessage } from "@/utils";
import { useUser } from "@/hooks";

const BlogHeadline = ({ aboutRef }) => {
  const dispatch = useDispatch();

  const { isCurrentTask, isEmpty, items, loading } = useSelector(
    blogSelector.getBlogItem(BLOG_HEADLINE)
  );
  const { about } = useSelector(blogSelector.getBlogContent);
  const { isAuth } = useUser();

  const validAbout = about.trim().length > 0;

  const handleSubscriberModalOpen = (message) => {
    dispatch(setSubscriberUsageModal({ usage: true, message }));
  };

  const handleBlogHeadline = () => {
    if (validAbout) {
      if (isAuth) {
        dispatch(
          postBlogContents({
            task: BLOG_HEADLINE,
            data: {
              task: BLOG_HEADLINE,
              blogAbout: about,
            },
          })
        ).then(({ payload }) => {
          if (payload.status === 400) {
            handleSubscriberModalOpen(payload.data.message);
          }
        });
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
        loading={loading}
        text="Blog Headline"
        isActive={isCurrentTask}
        onClick={handleBlogHeadline}
        currentTask={BLOG_HEADLINE}
      />
      <Collapse isOpen={isCurrentTask && !isEmpty}>
        {items.map((item, index) => (
          <TextItem
            onClick={() => dispatch(setStateBlogTitle(item))}
            key={index}
          >
            {item}
          </TextItem>
        ))}
      </Collapse>
    </ToolItem>
  );
};

export default BlogHeadline;
