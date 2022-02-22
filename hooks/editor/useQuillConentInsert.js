import { useState, useEffect } from "react";

import useQuillSelected from "./useQuillSelected";

const INTERVAL_MS = 1;

const useQuillConentInsert = (quill, item = "", isContentUpdate = false) => {
  const { range, lastIndex: lIndex } = useQuillSelected(quill);
  const [isTyping, setIsTyping] = useState(true);
  const [itemArr, setItemArr] = useState([]);
  const [lastIndex, setLastIndex] = useState(lIndex);
  const [index, setIndex] = useState(0);

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
    if (item.length > 0) {
      setItemArr(item?.split(" "));
    }
  }, [item]);

  useEffect(() => {
    let interval;
    const itemArrLength = itemArr.length;
    if (quill && itemArrLength) {
      interval = setInterval(() => {
        if (itemArrLength > index) {
          let word = itemArr[index];
          quill.insertText(lastIndex, ` ${word}`);
          quill.enable(false);
          quill.blur();
          setIndex(index + 1);
          setLastIndex(lastIndex + word.length + 1);
          setIsTyping(true);
        } else {
          clearInterval(interval);
          quill.enable(true);
          setIndex(0);
          setItemArr([]);
          setIsTyping(false);
        }
      }, INTERVAL_MS);
    }

    return () => {
      clearInterval(interval);
    };
  }, [index, itemArr, lastIndex, quill]);

  return isTyping;
};

export default useQuillConentInsert;
