const { withSentryConfig } = require("@sentry/nextjs");
const path = require("path");

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

const sentryWebpackPluginOptions = {};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
