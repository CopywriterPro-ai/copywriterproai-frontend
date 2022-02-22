import { useEffect } from "react";

const useQuillPlainPaste = (quill) => {
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

  return null;
};

export default useQuillPlainPaste;
