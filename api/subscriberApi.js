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
  postSubscriptionSwitch: ({ data }) => {
    return fetcher("/subscriber/sub-switcher", {
      method: "post",
      data,
    });
  },
};

export default subscriber;
