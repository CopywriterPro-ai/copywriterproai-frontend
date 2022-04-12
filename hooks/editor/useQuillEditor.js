import { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";

import { AI_BLOG_WRITER, AI_COMPLETE_BLOG_WRITER } from "@/appconstants";

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

const useQuillEditor = (id = AI_BLOG_WRITER) => {
  const [editor, setEditor] = useState({
    quill: undefined,
    quillRef: undefined,
    Quill: undefined,
  });

  const editor1 = useQuill({
    placeholder: "Start writing here and select text to unlock more features.",
    theme: "snow",
    modules,
    formats,
  });

  const editor2 = useQuill({
    placeholder: "Start writing here and select text to unlock more features.",
    theme: "snow",
    modules,
    formats,
  });

  useEffect(() => {
    if (editor1?.quill) {
      editor1?.quill?.clipboard?.addMatcher(
        Node.ELEMENT_NODE,
        (node, delta) => {
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
        }
      );
    }
  }, [editor1?.quill]);

  useEffect(() => {
    if (editor2?.quill) {
      editor2?.quill?.clipboard?.addMatcher(
        Node.ELEMENT_NODE,
        (node, delta) => {
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
        }
      );
    }
  }, [editor2?.quill]);

  useEffect(() => {
    switch (id) {
      case AI_BLOG_WRITER:
        setEditor({
          quill: editor1.quill,
          quillRef: editor1.quillRef,
          Quill: editor1.Quill,
        });
        break;

      case AI_COMPLETE_BLOG_WRITER:
        setEditor({
          quill: editor2.quill,
          quillRef: editor2.quillRef,
          Quill: editor2.Quill,
        });
        break;

      default:
        console.warn(`"${id}" is not a valid editor id`);
        break;
    }
  }, [editor1, editor2, id]);

  return editor;
};

export default useQuillEditor;
