import isServer from "./isServer";

const baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

const strategyAction = (strategy) => {
  if (!isServer) window.open(`${baseURL}/v1/auth/${strategy}`, "_self");
};

export default strategyAction;
