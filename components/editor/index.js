import styled, { createGlobalStyle } from "styled-components";
import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import "quill/dist/quill.snow.css";

import {
  writeAlongActions,
  selectors as writeAlongSelector,
} from "@/redux/slices/blog";
import { selectors as draftSelector } from "@/redux/slices/draft";
import {
  useUser,
  useQuillEditor,
  useQuillSelected,
  useQuillContentChange,
  useQuillPlainPaste,
  useQuillConentDirectInsert,
} from "@/hooks";
import { AI_BLOG_WRITER } from "@/appconstants";
import toolsvalidation from "@/data/toolsvalidation";

const QuillEditor = ({ setQuillEditor }) => {
  const dispatch = useDispatch();
  const { subscribe } = useUser();

  const [selectedLength, setSelectedLength] = useState(0);
  const [focusInEditor, setFocusInEditor] = useState(false);
  const editorcontainerRef = useRef(null);
  const { item } = useSelector(writeAlongSelector.getContent());
  const { currenttask } = useSelector(writeAlongSelector.getEditor());
  const {
    activeId,
    item: { blogPost },
  } = useSelector(draftSelector.getDraftBlogs());
  const { quill, quillRef } = useQuillEditor(AI_BLOG_WRITER);
  const { range, text, position } = useQuillSelected(quill);
  const currentContent = useQuillContentChange(quill);
  const isContentTyping = useQuillConentDirectInsert(quill, item, true);
  const [editorContent] = useDebounce(currentContent, 1000);
  useQuillPlainPaste(quill);

  useEffect(() => {
    if (quill) setQuillEditor(quill);
  }, [quill, setQuillEditor]);

  useEffect(() => {
    if (!isContentTyping) {
      dispatch(writeAlongActions.setContent({ item: "", items: [] }));
      dispatch(
        writeAlongActions.setEditor({
          selected: null,
          range: { index: 0, length: 0 },
        })
      );
    }
  }, [dispatch, isContentTyping]);

  useEffect(() => {
    dispatch(writeAlongActions.setEditor({ value: editorContent }));
  }, [dispatch, editorContent]);

  useEffect(() => {
    dispatch(writeAlongActions.setEditor({ range, selected: text }));
  }, [dispatch, range, text]);

  useEffect(() => {
    if (activeId.length > 0 && quill && blogPost) {
      quill.setContents(JSON.parse(blogPost));
    }
  }, [activeId, blogPost, dispatch, quill]);

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
