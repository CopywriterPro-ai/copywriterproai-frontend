import NextHead from "next/head";
import { DefaultSeo } from "next-seo";
import config from "@/config/seo.json";

const Head = ({ title, description, otherSEO = {}, additionalMeta = [] }) => {
  const seoConfig = {
    ...config,
    ...(title && {
      title,
    }),
    ...(description && {
      description,
    }),
    openGraph: {
      ...config.openGraph,
      ...(title && { title }),
      ...(description && { description }),
    },
    ...otherSEO,
  };

  return (
    <>
      <DefaultSeo {...seoConfig} additionalMetaTags={additionalMeta} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      </NextHead>
    </>
  );
};

export default Head;
