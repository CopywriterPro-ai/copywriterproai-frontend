import deepEqual from "deep-equal";
import { useEffect, useRef, useMemo } from "react";
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

const QuillEditor = ({ setQuillEditor }) => {
  const dispatch = useDispatch();

  const { quill, quillRef } = useQuillEditor(AI_COMPLETE_BLOG_WRITER);
  const { range, text, position } = useQuillSelected(quill);
  const { value } = useSelector(selectors.getEditor());
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
          currenttask: null,
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

  return (
    <div className="editor-container" ref={editorcontainerRef}>
      <div style={{ wordBreak: "break-word" }} ref={quillRef} />
      {/* <EditorModal
        position={position}
        quill={quill}
        editorWidth={editorWidth}
      /> */}
    </div>
  );
};

export default QuillEditor;
