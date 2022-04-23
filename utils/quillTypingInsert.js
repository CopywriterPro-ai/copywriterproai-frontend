const quillTypingInsert = (
  quill,
  item = "",
  { lastIndex, range },
  isSelectedUpdate = false
) => {
  if (quill && item.length) {
    let itemArr = item.split(" ");
    let lIndex = 0;
    let arrLength = itemArr.length;

    if (isSelectedUpdate || range.length > 0) {
      lIndex = lastIndex;
    } else {
      lIndex = quill.getLength();
    }

    for (let index = 0; index < arrLength; index++) {
      let word = itemArr[index];

      quill.insertText(lIndex, `${lIndex === 0 ? "" : " "}${word}`);
      quill.enable(false);
      quill.blur();
      setLastIndex(lIndex + word.length + 1);
      setIsTyping(true);
    }
  }
};

export default quillTypingInsert;
