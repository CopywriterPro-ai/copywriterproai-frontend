import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import "quill/dist/quill.snow.css";

import EditorModal from "components/EditorModal";
import {
  writerAlongActions,
  selectors as writerAlongSelector,
} from "@/redux/slices/blog";
import { selectors as draftSelector } from "@/redux/slices/draft";
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
  const { item } = useSelector(writerAlongSelector.getContent());
  const {
    activeId,
    item: { blogPost },
  } = useSelector(draftSelector.getDraftBlogs());
  const dra = useSelector(draftSelector.getDraftBlogs());
  const { quill, quillRef } = useQuillEditor(AI_BLOG_WRITER);
  const { range, text, position } = useQuillSelected(quill);
  const currentContent = useQuillContentChange(quill);
  const isTyping = useQuillConentTypingInsert(quill, item, true);
  const [editorContent] = useDebounce(currentContent, 1000);
  useQuillPlainPaste(quill);

  useEffect(() => {
    if (quill) setQuillEditor(quill);
  }, [quill, setQuillEditor]);

  useEffect(() => {
    if (!isTyping) {
      dispatch(writerAlongActions.setContent({ item: "", items: [] }));
    }
  }, [dispatch, isTyping]);

  useEffect(() => {
    dispatch(writerAlongActions.setEditor({ value: editorContent }));
  }, [dispatch, editorContent]);

  useEffect(() => {
    dispatch(writerAlongActions.setEditor({ range, selected: text }));
  }, [dispatch, range, text]);

  useEffect(() => {
    if (activeId.length > 0 && quill) {
      quill.setContents(blogPost);
    }
  }, [activeId, blogPost, dispatch, quill]);

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
