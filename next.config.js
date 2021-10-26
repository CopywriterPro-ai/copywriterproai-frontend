const path = require("path");

module.exports = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/forgot-password",
  //       destination: "/forgotpassword",
  //     },
  //   ];
  // },
  poweredByHeader: false,
  reactStrictMode: false,

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
