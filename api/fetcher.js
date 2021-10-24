import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_APP_API_URL}/v1`;

export const instance = axios.create({ baseURL });

const fetcher = async (url, optionsProps = {}) => {
  const options = {
    url,
    ...optionsProps,
  };

  return await instance(options);
};

export default fetcher;
