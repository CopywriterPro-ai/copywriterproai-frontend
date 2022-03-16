import styled, { createGlobalStyle } from "styled-components";
import { useEffect, useRef, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import "quill/dist/quill.snow.css";

import {
  setEditor,
  setBlogComplete,
  setBlogContent,
  selectors,
} from "@/redux/slices/completeBlog";
import { selectors as draftSelector } from "@/redux/slices/draft";
import {
  useUser,
  useQuillEditor,
  useQuillSelected,
  useQuillContentChange,
  useQuillPlainPaste,
  useQuillConentTypingInsert,
  useQuillConentDirectInsert,
} from "@/hooks";
import { AI_COMPLETE_BLOG_WRITER } from "@/appconstants";
import toolsvalidation from "@/data/toolsvalidation";

const QuillEditor = ({ setQuillEditor }) => {
  const dispatch = useDispatch();
  const { subscribe } = useUser();

  const [selectedLength, setSelectedLength] = useState(0);
  const [focusInEditor, setFocusInEditor] = useState(false);
  const { quill, quillRef } = useQuillEditor(AI_COMPLETE_BLOG_WRITER);
  const { range, text } = useQuillSelected(quill);
  const { value, currenttask } = useSelector(selectors.getEditor());
  const {
    complete: { items: completeItems },
    content: { item: contentItem },
  } = useSelector(selectors.getCompleteBlogContent);
  const {
    activeId,
    item: { blogPost },
  } = useSelector(draftSelector.getDraftBlogs());
  const currentContent = useQuillContentChange(quill);
  const editorcontainerRef = useRef(null);
  const isTyping = useQuillConentTypingInsert(quill, completeItems);
  const isContentTyping = useQuillConentDirectInsert(quill, contentItem, true);
  const [editorContent] = useDebounce(currentContent, 1000);
  useQuillPlainPaste(quill);

  useEffect(() => {
    if (quill) setQuillEditor(quill);
  }, [quill, setQuillEditor]);

  useEffect(() => {
    if (!isTyping) {
      dispatch(setBlogComplete({ items: [] }));
    }
  }, [dispatch, isTyping]);

  useEffect(() => {
    if (!isContentTyping) {
      dispatch(setBlogContent({ item: "", items: [] }));
      dispatch(
        setEditor({
          selected: null,
          range: { index: 0, length: 0 },
        })
      );
    }
  }, [dispatch, isContentTyping]);

  useEffect(() => {
    dispatch(setEditor({ value: editorContent }));
  }, [dispatch, editorContent]);

  useEffect(() => {
    if (activeId.length > 0 && quill && blogPost) {
      const contents = Array.isArray(blogPost)
        ? blogPost
        : JSON.parse(blogPost);
      quill.setContents(contents);
    }
  }, [activeId, blogPost, quill]);

  useEffect(() => {
    dispatch(setEditor({ range, selected: text }));
  }, [dispatch, range, text]);

  useEffect(() => {
    const getSelection = (event) => {
      const { className, contentEditable } = event.target.activeElement;
      if (contentEditable === "true" && className === "ql-editor") {
        const selectedTexts = document.getSelection().toString().trim();
        setSelectedLength(selectedTexts.length);
        setFocusInEditor(true);
      } else {
        setFocusInEditor(false);
      }
    };

    document.addEventListener("selectionchange", getSelection);
    return () => {
      document.removeEventListener("selectionchange", getSelection);
    };
  }, []);

  const { isMin, isMax, isOk } = useMemo(() => {
    const { min, max } = toolsvalidation(
      currenttask,
      subscribe.subscription === "Freemium"
    )?.userText;

    const isMin = focusInEditor && selectedLength < min;
    const isMax = focusInEditor && selectedLength > max;
    const isOk = focusInEditor && !isMin && !isMax;

    return {
      isMin,
      isMax,
      isOk,
    };
  }, [currenttask, focusInEditor, selectedLength, subscribe.subscription]);

  return (
    <div className="editor-container" ref={editorcontainerRef}>
      <GlobalStyled
        IsMin={isMin.toString()}
        IsMax={isMax.toString()}
        IsOk={isOk.toString()}
      />
      <StyledQuill ref={quillRef} />
    </div>
  );
};

const StyledQuill = styled.div`
  word-break: break-word;
`;

const GlobalStyled = createGlobalStyle`

${({ IsMin }) =>
  IsMin === "true" &&
  `
  &::selection {
      background: rgb(198 201 0 / 15%);
      color: #a58e01;
    }
  `}

${({ IsMax }) =>
  IsMax === "true" &&
  `
  &::selection {
      background: rgba(222, 68, 55, 0.1);
      color: #de4437;
    }
  `}

${({ IsOk }) =>
  IsOk === "true" &&
  `
  &::selection {
      background: rgba(0, 201, 167, 0.1);
      color: #00c9a7;
    }
  `}
`;

export default QuillEditor;
