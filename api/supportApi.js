import fetcher from "./fetcher";

const support = {
  postContactUs: ({ data }) => {
    return fetcher(`/support/contact`, {
      method: "post",
      data,
    });
  },
  postBugReport: ({ data }) => {
    return fetcher(`/support/bug-report`, {
      method: "post",
      data,
    });
  },
  postFeatureRequest: ({ data }) => {
    return fetcher(`/support/feature-request`, {
      method: "post",
      data,
    });
  },
};

export default support;
