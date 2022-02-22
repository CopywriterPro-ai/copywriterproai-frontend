// import { useState, useEffect } from "react";
// import useQuillSelected from "./useQuillSelected";

// const INTERVAL_MS = 1;

// const useQuillConentInsert = (quill, item = "") => {
//   const { range } = useQuillSelected(quill);
//   const [isTyping, setIsTyping] = useState(true);
//   const [lastIndex, setLastIndex] = useState(0);
//   const [index, setIndex] = useState(0);
//   const [itemArr, setItemArr] = useState([]);

//   useEffect(() => {
//     const { index, length } = range;
//     if (isTyping && length > 0) {
//       setLastIndex(index + length);
//     } else {
//       setLastIndex(0);
//     }
//   }, [isTyping, range]);

//   useEffect(() => {
//     let interval;
//     if (quill && item.length) {
//       setItemArr(item?.split(" "));
//       const itemArrLength = itemArr.length;

//       interval = setInterval(() => {
//         if (itemArrLength > index) {
//           let word = itemArr[index];
//           quill.insertText(lastIndex, ` ${word}`);
//           setIsTyping(true);
//           setIndex(index + 1);
//           setLastIndex(lastIndex + word.length + 1);
//         } else {
//           clearInterval(interval);
//           setIndex(0);
//           setIsTyping(false);
//           setItemArr([]);
//         }
//       }, INTERVAL_MS);
//     }

//     return () => {
//       if (quill) {
//         clearInterval(interval);
//       }
//     };
//   }, [index, item, itemArr, lastIndex, quill]);

//   return isTyping;
// };

// export default useQuillConentInsert;

import { useState, useEffect } from "react";

import useQuillSelected from "./useQuillSelected";

const INTERVAL_MS = 1;

const useQuillConentInsert = (quill, item = "") => {
  const { range, lastIndex: lIndex } = useQuillSelected(quill);
  const [isTyping, setIsTyping] = useState(true);
  const [itemArr, setItemArr] = useState([]);
  const [lastIndex, setLastIndex] = useState(lIndex);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const { length } = range;
    const contentLength = quill?.getLength();
    if (length > 0) {
      setLastIndex(lIndex);
    } else {
      setLastIndex(contentLength);
    }
  }, [lIndex, quill, range]);

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
