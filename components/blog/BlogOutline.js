import { useState } from "react";
import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  postBlogContents,
  setStateBlogOutline,
  selectors as blogSelector,
} from "@/redux/slices/blog";
import { setSigninModal, setSubscriberUsageModal } from "@/redux/slices/ui";
import ToolTitleItem from "./ToolTitleItem";
import { ToolItem, TextItem, OutlineForm, GenButton } from "./styles";
import { BLOG_OUTLINE } from "@/appconstants";
import { toastMessage } from "@/utils";
import Loader from "@/components/common/Loader";
import { useUser } from "@/hooks";

const BlogOutline = ({ aboutRef, quillRef }) => {
  const dispatch = useDispatch();

  const [number, setNumber] = useState(5);

  const { isCurrentTask, items, loading } = useSelector(
    blogSelector.getBlogItem(BLOG_OUTLINE)
  );
  const { about } = useSelector(blogSelector.getBlogContent);
  const { isAuth } = useUser();
  const validAbout = about.trim().length > 0;

  const handleSubscriberModalOpen = (message) => {
    dispatch(setSubscriberUsageModal({ usage: true, message }));
  };

  const handleBlogOutline = () => {
    if (validAbout) {
      if (isAuth) {
        dispatch(
          postBlogContents({
            task: BLOG_OUTLINE,
            data: {
              task: BLOG_OUTLINE,
              numberOfPoints: number,
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

  const handleSelectBlogOutline = (item) => {
    dispatch(setStateBlogOutline(item));
    item = item
      .split("\n")
      .map((text) => text + "\n")
      .join("\n");
    const quillLastIndex = quillRef.getLength();
    quillRef.insertText(quillLastIndex - 2, `\n\n${item}`, "bold", true);
  };

  return (
    <ToolItem>
      <ToolTitleItem
        text="Blog Outline"
        isActive={isCurrentTask}
        isOutline={true}
        currentTask={BLOG_OUTLINE}
      />
      <Collapse isOpen={isCurrentTask}>
        <OutlineForm>
          <p>Number of Points</p>
          <input
            type="number"
            name="number"
            min="3"
            max="10"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />
          <GenButton
            disabled={loading}
            loading={loading.toString()}
            onClick={handleBlogOutline}
          >
            {loading ? (
              <div style={{ display: "flex" }}>
                Generating <Loader style={{ marginLeft: "5px" }} size="10px" />
              </div>
            ) : (
              "Generate"
            )}
          </GenButton>
        </OutlineForm>
        {items.map((item, index) => {
          const texts = item.trim()?.split("\n");
          return (
            <TextItem onClick={() => handleSelectBlogOutline(item)} key={index}>
              <ol>
                {texts.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ol>
            </TextItem>
          );
        })}
      </Collapse>
    </ToolItem>
  );
};

export default BlogOutline;
