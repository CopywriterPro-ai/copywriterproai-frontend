const delay = async (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const quillTypingInsert = async (
  quill,
  item = "",
  { lastIndex, range },
  isSelectedUpdate = false
) => {
  let typingComplate = false;

  if (quill && item.length) {
    let itemArr = item.toString().split(" ");
    let arrLength = itemArr.length;
    let lIndex = 0;

    if (isSelectedUpdate || range.length > 0) {
      lIndex = lastIndex;
    } else {
      lIndex = quill.getLength();
    }

    quill.focus();
    quill.enable(false);
    quill.blur();
    typingComplate = false;

    for (let index = 0; index < arrLength; index++) {
      const word = itemArr[index];
      quill.insertText(lIndex, `${lIndex === 0 ? "" : " "}${word}`);
      lIndex = lIndex + word.length + 1;
      await delay(30);
    }

    quill.enable(true);
    lIndex = 0;
    itemArr = [];
    typingComplate = true;
  }

  return typingComplate;
};

export default quillTypingInsert;
