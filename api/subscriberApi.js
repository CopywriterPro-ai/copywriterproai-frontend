import fetcher from "./fetcher";

const subscriber = {
  getOwnSubscriber: () => {
    return fetcher("/subscriber/me");
  },
  patchGenerateUpdate: ({ data }) => {
    return fetcher("/subscriber/generate-update", {
      method: "patch",
      data,
    });
  },
};

export default subscriber;
