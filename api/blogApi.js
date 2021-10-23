import fetcher from "./fetcher";

const blog = {
  getBlogs: ({ params = {} }) => {
    return fetcher("/blogs", {
      params,
    });
  },

  createBlog: ({ data }) => {
    return fetcher("/blogs/create-new", {
      method: "post",
      data,
    });
  },

  getBlog: ({ id }) => {
    return fetcher(`/blogs/${id}`);
  },

  updateBlog: ({ id, data }) => {
    return fetcher(`/blogs/${id}`, {
      method: "patch",
      data,
    });
  },

  deleteBlog: ({ id }) => {
    return fetcher(`/blogs/${id}`, {
      method: "delete",
    });
  },
};

export default blog;
