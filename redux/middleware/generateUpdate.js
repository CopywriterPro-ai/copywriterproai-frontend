import { patchGenerateUpdate } from "@/redux/slices/subscriber";

const whitelistAction = [
  "content/postBlogContentsFetching/fulfilled",
  "content/postGenerateContentsFetching/fulfilled",
  "content/postEditorToolsContentFetching/fulfilled",
];

const generateUpdate =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const isAction = whitelistAction.includes(action.type);
    if (isAction) {
      let generatedTextsArr = [];
      const { generatedTexts = [] } = action.payload.data;

      if (Array.isArray(generatedTexts)) {
        generatedTextsArr = generatedTexts;
      } else if (typeof generatedTexts === "string") {
        generatedTextsArr = [generatedTexts];
      } else {
        console.error("Check return generate datas");
      }

      let wordsCount = 0;

      generatedTextsArr.forEach((texts) => {
        const trimText = texts.trim();
        const wordLength = trimText.split(" ").length;
        wordsCount += wordLength;
      });

      dispatch(patchGenerateUpdate({ data: { useWords: wordsCount } })).then(
        () => {
          next(action);
        }
      );
    }
    next(action);
  };

export default generateUpdate;
