import { useEffect, useState } from "react";
import rs from "text-readability";

const useQuillCounter = (quill) => {
  const [texts, setTexts] = useState("");
  const [optimizeTexts, setOptimizeTexts] = useState("");
  const [count, setCount] = useState({
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
      setCount({
        readabilityScore: rs.fleschReadingEase(optimizeTexts),
        sentence: rs.sentenceCount(optimizeTexts),
        word: rs.syllableCount(optimizeTexts, "en-US"),
        character: optimizeTexts.length,
      });
    } else {
      setCount({ readabilityScore: 0, sentence: 0, word: 0, character: 0 });
    }
  }, [optimizeTexts]);

  return count;
};

export default useQuillCounter;
