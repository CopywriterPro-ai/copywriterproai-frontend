import { useState, useEffect } from "react";

const useQuillContentChange = (quill) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const textChange = (delta, oldDelta, source) => {
      const content = quill.getContents().ops;
      setContent(content);
    };

    if (quill) {
      quill.on("text-change", textChange);
    }
    return () => {
      if (quill) {
        quill.off("text-change", textChange);
      }
    };
  }, [quill]);

  return content;
};

export default useQuillContentChange;
