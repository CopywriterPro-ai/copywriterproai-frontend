import { useMemo } from "react";

import useQuillSelected from "./useQuillSelected";
import quillTypingInsert from "@/utils/quillTypingInsert";

const useQuillConentTypingInsert = (
  quill,
  item = "",
  isContentUpdate = false
) => {
  const { range, lastIndex } = useQuillSelected(quill);

  const contentTyping = useMemo(() => {
    const typingComplate = quillTypingInsert(
      quill,
      item,
      { range, lastIndex },
      isContentUpdate
    );

    return typingComplate;
  }, [isContentUpdate, item, lastIndex, quill, range]);

  return contentTyping;
};

export default useQuillConentTypingInsert;
