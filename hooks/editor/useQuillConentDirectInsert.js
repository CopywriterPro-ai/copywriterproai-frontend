import { useState, useEffect } from "react";

import useQuillSelected from "./useQuillSelected";

const useQuillConentDirectInsert = (
  quill,
  item = "",
  isContentUpdate = false
) => {
  const { range, lastIndex: lIndex } = useQuillSelected(quill);
  const [isTyping, setIsTyping] = useState(true);
  const [lastIndex, setLastIndex] = useState(lIndex);
  const [texts, setTexts] = useState("");

  useEffect(() => {
    const { length } = range;
    const contentLength = quill?.getLength();

    if (isContentUpdate || length > 0) {
      setLastIndex(lIndex);
    } else {
      setLastIndex(contentLength);
    }
  }, [isContentUpdate, lIndex, quill, range]);

  useEffect(() => {
    if (item.length > 1) {
      setTexts(item);
    }
  }, [item]);

  useEffect(() => {
    if (quill && texts.length > 1) {
      setIsTyping(true);
      quill.insertText(lastIndex, `\n ${texts}\n\n`);
    }

    return () => {
      setIsTyping(false);
      setTexts("");
    };
  }, [item, lastIndex, quill, texts]);

  return isTyping;
};

export default useQuillConentDirectInsert;
