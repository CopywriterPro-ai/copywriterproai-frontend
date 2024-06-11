import fetcher from "./fetcher";

const tools = {
  getToolCategories: () => {
    return fetcher(`/tools/categories`);
  },
  postToolCategories: ({ data }) => {
    return fetcher(`/tools/categories`, {
      method: "post",
      data,
    });
  },
  patchToolCategory: ({ id, data }) => {
    return fetcher(`/tools/categories/${id}`, {
      method: "patch",
      data,
    });
  },
  deleteToolCategory: ({ id }) => {
    return fetcher(`/tools/categories/${id}`, {
      method: "delete",
    });
  },

  getTools: () => {
    return fetcher(`/tools`);
  },
  postTools: ({ data }) => {
    return fetcher(`/tools`, {
      method: "post",
      data,
    });
  },
  patchTools: ({ id, data }) => {
    return fetcher(`/tools/${id}`, {
      method: "patch",
      data,
    });
  },
  deleteTools: ({ id }) => {
    return fetcher(`/tools/${id}`, {
      method: "delete",
    });
  },
};

export default tools;
