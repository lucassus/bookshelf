const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-knobs/register"
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(css|scss)$/,
      use: [
        "style-loader",
        { loader: "css-loader", options: { modules: true } },
        "sass-loader"
      ],
      include: path.resolve(__dirname, "../")
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: ["ts-loader"]
    });

    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  }
};
