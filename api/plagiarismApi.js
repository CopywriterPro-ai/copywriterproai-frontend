import fetcher from "./fetcher";

const plagiarism = {
  postCheckPlagiarism: ({ data }) => {
    return fetcher("/plagiarism-checker/check-plagiarism", {
      method: "post",
      data,
    });
  },
};

export default plagiarism;
