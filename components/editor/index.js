import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditorModal from "components/EditorModal";
import {
  setEditorCurrentValue,
  setEditorCurrentSelectedRange,
  setEditorCurrentSelectedText,
  selectors as blogSelector,
} from "@/redux/slices/blog";
import { quill as ReactQuill } from "@/utils";

const modules = {
  toolbar: {
    container: "#toolbar",
  },
};

const formats = [
  "size",
  "font",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "link",
  "image",
  "color",
  "background",
  "header",
  "list",
  "align",
];

const QuillEditor = ({ setQuillEditor }) => {
  const dispatch = useDispatch();
  const quillRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const [position, setPostion] = useState({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  });
  const [editorRef, setEditorRef] = useState(null);
  const { value, selected } = useSelector(blogSelector.getEditor());

  const handleChange = (value, delta, source, editor) => {
    const content = editor.getContents().ops;
    dispatch(setEditorCurrentValue(content));
  };

  const handleSelectionChange = (range, source, editor) => {
    if (range && range.length > 0) {
      dispatch(setEditorCurrentSelectedRange(range));
      const selected = editor.getText(range).trim();
      if (selected.length > 0) {
        setPostion(editor.getBounds(range));
        dispatch(setEditorCurrentSelectedText(selected));
      }
    } else {
      if (selected !== null) dispatch(setEditorCurrentSelectedText(null));
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof quillRef.current?.getEditor !== "function") return;
    const editor = quillRef.current.getEditor();
    setQuillEditor(editor);
    setEditorRef(editor);
  }, [setQuillEditor]);

  useEffect(() => {
    editorRef?.clipboard?.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      let ops = [];
      delta.ops.forEach((op) => {
        if (op.insert && typeof op.insert === "string") {
          ops.push({
            insert: op.insert,
          });
        }
      });
      delta.ops = ops;
      return delta;
    });
  }, [editorRef]);

  return (
    <div className="editor-container">
      {mounted && (
        <ReactQuill
          modules={modules}
          formats={formats}
          placeholder="Start writing here..."
          forwardedRef={(instants) => (quillRef.current = instants)}
          value={{ ops: value }}
          onChangeSelection={handleSelectionChange}
          onChange={handleChange}
          theme="snow"
        ></ReactQuill>
      )}
      <EditorModal position={position} quill={editorRef} />
    </div>
  );
};

export default QuillEditor;
