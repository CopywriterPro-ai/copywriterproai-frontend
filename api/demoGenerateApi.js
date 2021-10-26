import fetcher from "./fetcher";

const demoGenerate = {
  postLandingDemo: ({ data, task }) => {
    return fetcher(`/demo/${task}`, {
      method: "post",
      data,
    });
  },
};

export default demoGenerate;
