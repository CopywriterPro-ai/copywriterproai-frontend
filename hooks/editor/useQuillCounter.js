import { useEffect, useState } from "react";
import rs from "text-readability";
import readingTime from "reading-time";

const useQuillCounter = (quill) => {
  const [texts, setTexts] = useState("");
  const [optimizeTexts, setOptimizeTexts] = useState("");
  const [count, setCount] = useState({
    timeToRead: 0,
    readabilityScore: 0,
    sentence: 0,
    word: 0,
    character: 0,
  });

  useEffect(() => {
    const setCounter = (eventName) => {
      if (eventName === "text-change") {
        const editorTexts = quill.getText().replace(/\n/g, "").trim();
        setTexts(editorTexts);
      }
    };

    if (quill) {
      quill.on("editor-change", setCounter);
    }
    return () => {
      if (quill) {
        quill.off("editor-change", setCounter);
      }
    };
  }, [quill]);

  useEffect(() => {
    setOptimizeTexts(texts.split(" ").filter(Boolean).join(" "));
  }, [texts]);

  useEffect(() => {
    if (optimizeTexts.length > 0) {
      const readScore = rs.fleschReadingEase(optimizeTexts);

      const { minutes, time } = readingTime(optimizeTexts);
      const min = Math.floor(minutes), sec = Math.floor((time/1000) % 60);
      const readTime = (min ? `${min} min` : '') + (min ? (sec ? ` ${sec} sec` : '') : `${sec} sec`);

      setCount({
        timeToRead: readTime,
        readabilityScore: Math.min(Math.max(parseInt(readScore), 0), 100),
        sentence: rs.sentenceCount(optimizeTexts),
        word: rs.syllableCount(optimizeTexts, "en-US"),
        character: optimizeTexts.length,
      });
    } else {
      setCount({ timeToRead: '0 sec', readabilityScore: 0, sentence: 0, word: 0, character: 0 });
    }
  }, [optimizeTexts]);

  return count;
};

export default useQuillCounter;
