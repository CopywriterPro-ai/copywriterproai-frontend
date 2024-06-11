import fetcher from "./fetcher";

const user = {
  getMe: () => {
    return fetcher(`/users/me`);
  },
  updateBookmarks: ({ userId, data }) => {
    return fetcher(`/users/${userId}/bookmarks`, {
      method: "patch",
      data,
    });
  },
  updateContent: ({ userId, data }) => {
    return fetcher(`/users/${userId}/contents`, {
      method: "patch",
      data,
    });
  },
  getBookmarks: ({ userId, page = 1, limit = 10 }) => {
    return fetcher(`/users/${userId}/bookmarks?page=${page}&limit=${limit}`);
  },
  bookmarkReact: ({ userId, react, data }) => {
    return fetcher(`/interests/${userId}?action=${react}`, {
      method: "patch",
      data,
    });
  },
  getFavouriteTools: ({ userId }) => {
    return fetcher(`/users/${userId}/favourite-tools`);
  },
  updateFavouriteTools: ({ userId, data }) => {
    return fetcher(`/users/${userId}/favourite-tools`, {
      method: "patch",
      data,
    });
  },
  updateCopyCounter: () => {
    return fetcher(`/subscriber/copycounter`, {
      method: "patch",
    });
  },
  extensionAccessToken: () => {
    return fetcher(`/users/extension/access`, {
      method: "post",
    });
  },
  submitOpenAIApi: ({ data }) => {
    return fetcher("/auth/submit-own-openai-api-key", {
      method: "post",
      data,
    });
  },

  complateOnboading: () => {
    return fetcher("/auth/complete-onboarding", {
      method: "post",
    });
  },
};

export default user;
