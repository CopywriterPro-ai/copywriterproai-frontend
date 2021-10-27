import isServer from "./isServer";

const appurl = process.env.NEXT_PUBLIC_APP_URL;

const isProductionClient = Boolean(
  !isServer && appurl && new URL(appurl).host === window.location.hostname
);

export default isProductionClient;
