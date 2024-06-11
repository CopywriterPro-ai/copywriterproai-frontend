import fetcher from "./fetcher";

const ui = {
  getNotice: () => {
    return fetcher(`/notice/get-notice`);
  },
  updateNotice: ({ data }) => {
    return fetcher(`/notice/update-notice`, {
      method: "patch",
      data,
    });
  },
};

export default ui;
