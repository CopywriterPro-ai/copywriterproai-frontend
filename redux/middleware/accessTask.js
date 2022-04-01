const whitelistAction = [
  "content/postBlogContentsFetching/",
  "content/postGenerateContentsFetching/",
  "content/postEditorToolsContentFetching/",
  "completeBlog/postCompleteEditorToolsContentFetching/",
  "completeBlog/postCompleteBlogContentsFetching/",
  "content/postWriteAlongContentsFetching/",
  "content/postWriteAlongEditorToolsContentFetching/",
];

const accessTask =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const actionIndex = whitelistAction.findIndex((ac) =>
      action.type.startsWith(ac)
    );
    if (actionIndex >= 0) {
      // console.log(action);
      next(action);
    } else {
      next(action);
    }
  };

export default accessTask;
