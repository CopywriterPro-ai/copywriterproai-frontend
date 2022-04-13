/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");
const path = require("path");

const nextConfig = {
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  compiler: {
    styledComponents: true,
  },
  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
