import deepEqual from "deep-equal";
import styled, { createGlobalStyle } from "styled-components";
import { useEffect, useRef, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "quill/dist/quill.snow.css";

// import EditorModal from "components/CompleteEditorModal";
import {
  setEditor,
  setBlogComplete,
  setBlogContent,
  selectors,
} from "@/redux/slices/completeBlog";
import {
  // useElementSize,
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

  const [selectedLength, setSelectedLength] = useState(0);
  const [focusInEditor, setFocusInEditor] = useState(false);
  const { quill, quillRef } = useQuillEditor(AI_COMPLETE_BLOG_WRITER);
  const { range, text, position } = useQuillSelected(quill);
  const { value, currenttask } = useSelector(selectors.getEditor());
  const {
    complete: { items: completeItems },
    content: { item: contentItem },
  } = useSelector(selectors.getCompleteBlogContent);
  const currentContent = useQuillContentChange(quill);
  const editorcontainerRef = useRef(null);
  // const { width: editorWidth } = useElementSize(editorcontainerRef);
  const isTyping = useQuillConentTypingInsert(quill, completeItems[0]);
  const isContentTyping = useQuillConentDirectInsert(quill, contentItem, true);
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
          // currenttask: null,
          selected: null,
          range: { index: 0, length: 0 },
        })
      );
    }
  }, [dispatch, isContentTyping]);

  const isContentEqual = useMemo(() => {
    return deepEqual(value, currentContent);
  }, [currentContent, value]);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (!isContentEqual) dispatch(setEditor({ value: currentContent }));
    }, 1000);
    return () => clearInterval(updateInterval);
  }, [currentContent, dispatch, isContentEqual]);

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
    const { min, max } = toolsvalidation(currenttask, true)?.userText;

    const isMin = focusInEditor && selectedLength < min;
    const isMax = focusInEditor && selectedLength > max;
    const isOk = focusInEditor && !isMin && !isMax;

    return {
      isMin,
      isMax,
      isOk,
    };
  }, [currenttask, focusInEditor, selectedLength]);

  return (
    <div className="editor-container" ref={editorcontainerRef}>
      <GlobalStyled
        IsMin={isMin.toString()}
        IsMax={isMax.toString()}
        IsOk={isOk.toString()}
      />
      <StyledQuill ref={quillRef} />
      {/* <EditorModal
        position={position}
        quill={quill}
        editorWidth={editorWidth}
      /> */}
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
      background: #ffca2a;
      color: white;
    }
  `}

${({ IsMax }) =>
  IsMax === "true" &&
  `
  &::selection {
      background: #ff0000;
      color: white;
    }
  `}

${({ IsOk }) =>
  IsOk === "true" &&
  `
  &::selection {
      background: #8bc34a;
      color: white;
    }
  `}
`;

export default QuillEditor;
