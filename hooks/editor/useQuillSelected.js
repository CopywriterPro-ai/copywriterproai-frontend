import { useState, useEffect } from "react";

const useQuillSelected = (quill) => {
  const [quillSelected, setQuillSelected] = useState({
    range: { index: 0, length: 0 },
    lastIndex: 0,
    text: null,
    position: {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    },
    isEditorOutside: true,
  });

  useEffect(() => {
    const getSelected = (eventName, ...args) => {
      if (eventName === "selection-change") {
        const [range] = args;
        if (!range) {
          setQuillSelected({ ...quillSelected, isEditorOutside: true });
        } else if (range.length > 0) {
          const selected = quill
            .getText(range)
            .trim()
            .split(" ")
            .filter(Boolean)
            .join(" ");
          const position = quill.getBounds(range);
          setQuillSelected({
            ...quillSelected,
            range,
            lastIndex: range.length + range.index,
            text: selected,
            position,
            isEditorOutside: false,
          });
        } else {
          setQuillSelected({
            range: { index: range.index, length: 0 },
            lastIndex: range.index,
            text: null,
            position: {
              bottom: 0,
              height: 0,
              left: 0,
              right: 0,
              top: 0,
              width: 0,
            },
            isEditorOutside: false,
          });
        }
      }
    };

    if (quill) {
      quill.on("editor-change", getSelected);
    }
    return () => {
      if (quill) {
        quill.off("editor-change", getSelected);
      }
    };
  }, [quill, quillSelected]);

  return quillSelected;
};

export default useQuillSelected;
