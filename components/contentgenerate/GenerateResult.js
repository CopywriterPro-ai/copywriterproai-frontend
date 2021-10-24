import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  selectors as contentSelector,
  updateContentText,
} from "@/redux/slices/content";
import {
  updateBookmarks,
  updateContent,
  setCurrentBookmarkIdIndex,
  selectors as userSelector,
} from "@/redux/slices/user";
import {
  updateCopyCounter,
  selectors as authSelector,
} from "@/redux/slices/auth";

const GeneratingResult = () => {
  const dispatch = useDispatch();

  const [copyText, setCopyText] = useState({ copied: false, index: null });
  const [contentItemText, setContentItemText] = useState({
    text: "",
    index: null,
  });
  const [editContent, setEditContent] = useState({
    isEdit: false,
    contentIndex: null,
  });
  const [contentEditOnBlur, setContentEditOnBlur] = useState(false);
  const [copyIndex, setCopyIndex] = useState([]);
  const formContent = useSelector(contentSelector.getCurrentActiveTool());
  const { content } = useSelector(contentSelector.getGeneratedContents());
  const { id: userId } = useSelector(authSelector.getInfo);
  const { item: bookmarkItem, current: currentBookmarkItem } = useSelector(
    userSelector.getCurrentBookmarks
  );
  const { contentTexts, id: contentId } = content;
  const currentBookmarkIsPending = currentBookmarkItem.loading === "pending";

  useEffect(() => {
    setCopyIndex([]);
  }, [contentId]);

  useEffect(() => {
    if (!editContent.isEdit) {
      setContentEditOnBlur(false);
    }
  }, [editContent.isEdit]);

  useEffect(() => {
    if (copyText.copied) {
      setTimeout(() => {
        setCopyText({ copied: false, index: null });
      }, 400);
    }
  }, [copyText.copied]);

  useEffect(() => {
    if (contentEditOnBlur) {
      dispatch(
        updateContent({
          userId,
          data: {
            contentId,
            index: contentItemText.index,
            bookmarkedText: contentItemText.text,
          },
        })
      );
    }
  }, [contentEditOnBlur, contentId, contentItemText, dispatch, userId]);

  useEffect(() => {
    if (contentEditOnBlur) {
      setEditContent({ isEdit: false, contentIndex: null });
      dispatch(updateContentText(contentItemText));
    }
  }, [contentEditOnBlur, contentItemText, dispatch]);

  const handleContentEdit = (index, text) => {
    setContentItemText({ text, index });
    setEditContent({ isEdit: true, contentIndex: index });
  };

  const handleChangeContentText = ({ target }, index) => {
    const isIndexExist = bookmarkItem.contentIndexs.includes(index);
    if (isIndexExist) {
      handleUpdateBookmark(index, target.value);
    }
    setContentItemText({ text: target.value, index });
  };

  const handleUpdateBookmark = (index, bookmarkedText) => {
    if (!currentBookmarkIsPending) {
      dispatch(setCurrentBookmarkIdIndex({ contentId, index }));
      dispatch(
        updateBookmarks({
          userId,
          data: {
            contentId,
            index,
          },
        })
      );
    }
  };

  const handleCountCopy = (index) => {
    const isCopied = copyIndex.includes(index);
    if (!isCopied) {
      setCopyIndex([...copyIndex, index]);
      dispatch(updateCopyCounter());
    }
  };

  if (contentTexts.length === 0) {
    return null;
  }

  return (
    <Container>
      <p style={{ textAlign: "center" }}>
        We generated {contentTexts.length} {formContent.name} based on your
        input.
      </p>
      {contentTexts.map((contentText, index) => {
        const isBookmark = bookmarkItem.contentIndexs.includes(
          contentText.textIndex
        );
        const isRigthContent = bookmarkItem.contentId === contentId;

        return (
          <ResultCard key={index}>
            <ResultContent>
              {editContent.isEdit && editContent.contentIndex === index ? (
                <TextareaAutosizeStyle
                  autoFocus
                  name="content"
                  maxRows={12}
                  value={contentItemText.text}
                  onFocus={() => setContentEditOnBlur(false)}
                  onBlur={() => setContentEditOnBlur(true)}
                  onChange={(e) =>
                    handleChangeContentText(e, contentText.textIndex)
                  }
                  placeholder="Edited Content"
                />
              ) : (
                <div onClick={() => handleContentEdit(index, contentText.text)}>
                  {contentText.text ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: contentText.text.replace(/\n/g, "<br />"),
                      }}
                    />
                  ) : (
                    "No Content"
                  )}{" "}
                  <ContentEdit className="far fa-edit"></ContentEdit>
                </div>
              )}
            </ResultContent>

            <ResultAction>
              <ResultActionRow>
                <CopyToClipboard
                  text={contentText.text}
                  onCopy={(text, copied) => setCopyText({ copied, index })}
                >
                  {copyText.copied && copyText.index === index ? (
                    <IconButton
                      isPending="false"
                      className="far fa-clipboard"
                    ></IconButton>
                  ) : (
                    <IconButton
                      isPending="false"
                      onClick={() => handleCountCopy(index)}
                      className="far fa-clone"
                    ></IconButton>
                  )}
                </CopyToClipboard>
                {isRigthContent && isBookmark ? (
                  <IconButton
                    isPending={
                      currentBookmarkItem.index === contentText.textIndex &&
                      currentBookmarkIsPending
                        ? "true"
                        : "false"
                    }
                    onClick={() =>
                      handleUpdateBookmark(
                        contentText.textIndex,
                        contentText.text
                      )
                    }
                    className="fas fa-bookmark"
                  ></IconButton>
                ) : (
                  <IconButton
                    isPending={
                      currentBookmarkItem.index === contentText.textIndex &&
                      currentBookmarkIsPending
                        ? "true"
                        : "false"
                    }
                    onClick={() =>
                      handleUpdateBookmark(
                        contentText.textIndex,
                        contentText.text
                      )
                    }
                    className="far fa-bookmark"
                  ></IconButton>
                )}
              </ResultActionRow>
            </ResultAction>
          </ResultCard>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2rem;
`;

const ContentEdit = styled.span`
  font-size: 14px;
  color: gray;
  margin-left: 10px;
  cursor: pointer;
`;

const ResultCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  margin: 10px 0;
  background-color: #fff;
  border: 1px solid #adb2b5;
  border-radius: 5px;
  outline: none;
  transition: all 0.2s;
`;

const ResultContent = styled.div`
  min-height: 4rem;
  padding: 8px;
  width: 90%;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const TextareaAutosizeStyle = styled(TextareaAutosize)`
  width: 100%;
  outline: 0;
  border: 1px solid #878787;
  border-radius: 2px;
`;

const IconButton = styled.span`
  cursor: ${({ isPending }) =>
    isPending === "false" ? "pointer" : "progress"};
`;

const ResultAction = styled.div`
  border-left: 1px solid #ebeff2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 4rem;
  padding: 8px;
  width: 10%;

  @media (max-width: 768px) {
    width: 20%;
  }
`;

const ResultActionRow = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default GeneratingResult;
