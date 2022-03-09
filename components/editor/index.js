import deepEqual from "deep-equal";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "quill/dist/quill.snow.css";

import EditorModal from "components/EditorModal";
import {
  writerAlongActions,
  selectors as writerAlongSelector,
} from "@/redux/slices/blog";
import {
  useElementSize,
  useQuillEditor,
  useQuillSelected,
  useQuillContentChange,
  useQuillPlainPaste,
  useQuillConentTypingInsert,
} from "@/hooks";
import { AI_BLOG_WRITER } from "@/appconstants";

const QuillEditor = ({ setQuillEditor }) => {
  const dispatch = useDispatch();
  const editorcontainerRef = useRef(null);
  const { width: editorWidth } = useElementSize(editorcontainerRef);

  const { value } = useSelector(writerAlongSelector.getEditor());
  const { item } = useSelector(writerAlongSelector.getContent());
  const { quill, quillRef } = useQuillEditor(AI_BLOG_WRITER);
  const { range, text, position } = useQuillSelected(quill);
  const currentContent = useQuillContentChange(quill);
  const isTyping = useQuillConentTypingInsert(quill, item, true);
  useQuillPlainPaste(quill);

  useEffect(() => {
    if (quill) setQuillEditor(quill);
  }, [quill, setQuillEditor]);

  const isContentEqual = useMemo(() => {
    return deepEqual(value, currentContent);
  }, [currentContent, value]);

  useEffect(() => {
    if (!isTyping) {
      dispatch(writerAlongActions.setContent({ item: "", items: [] }));
    }
  }, [dispatch, isTyping]);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (!isContentEqual)
        dispatch(writerAlongActions.setEditor({ value: currentContent }));
    }, 1000);
    return () => clearInterval(updateInterval);
  }, [currentContent, dispatch, isContentEqual]);

  useEffect(() => {
    dispatch(writerAlongActions.setEditor({ range, selected: text }));
  }, [dispatch, range, text]);

  return (
    <div className="editor-container" ref={editorcontainerRef}>
      <div ref={quillRef} />
      <EditorModal
        position={position}
        quill={quill}
        editorWidth={editorWidth}
      />
    </div>
  );
};

export default QuillEditor;
