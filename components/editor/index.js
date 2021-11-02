import deepEqual from "deep-equal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import EditorModal from "components/EditorModal";
import {
  setEditorCurrentValue,
  setEditorCurrentSelectedRange,
  setEditorCurrentSelectedText,
  selectors as blogSelector,
} from "@/redux/slices/blog";

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
  const { quill, quillRef } = useQuill({
    placeholder: "Start writing here...",
    theme: "snow",
    modules,
    formats,
  });

  const [position, setPostion] = useState({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  });
  const { value, selected } = useSelector(blogSelector.getEditor());

  useEffect(() => {
    if (quill) setQuillEditor(quill);
  }, [quill, setQuillEditor]);

  useEffect(() => {
    if (quill) {
      const current = quill.getContents().ops;
      const isEqual = deepEqual(value, current);
      if (!isEqual) {
        quill.setContents(value);
      }
    }
  }, [quill, value]);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        const content = quill.getContents().ops;
        dispatch(setEditorCurrentValue(content));
      });
    }
  }, [dispatch, quill]);

  useEffect(() => {
    if (quill) {
      quill.on("selection-change", function (range, oldRange, source) {
        if (range && range.length > 0) {
          dispatch(setEditorCurrentSelectedRange(range));
          const selected = quill.getText(range).trim();
          if (selected.length > 0) {
            setPostion(quill.getBounds(range));
            dispatch(setEditorCurrentSelectedText(selected));
          }
        } else {
          if (selected !== null) dispatch(setEditorCurrentSelectedText(null));
        }
      });
    }
  }, [dispatch, quill, selected]);

  useEffect(() => {
    if (quill) {
      quill?.clipboard?.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
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
    }
  }, [quill]);

  return (
    <div className="editor-container">
      <div ref={quillRef} />
      <EditorModal position={position} quill={quill} />
    </div>
  );
};

export default QuillEditor;
