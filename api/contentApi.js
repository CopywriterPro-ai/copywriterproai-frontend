import fetcher from "./fetcher";

const content = {
  postGenerateContents: ({ data, task }) => {
    return fetcher(`/contents/generate/${task}`, {
      method: "post",
      data,
    });
  },
  getToolsContent: () => {
    return fetcher(`/tools`);
  },
  getToolsCategory: () => {
    return fetcher(`/tools/categories`);
  },
  patchGenerateUpdate: () => {
    return fetcher(`/contents/generate-update`, {
      method: "patch",
    });
  },
};

export default content;
