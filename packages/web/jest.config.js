const package = require("./package.json");

module.exports = {
  displayName: {
    color: "green",
    name: package.name
  },
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      babelConfig: {
        // See https://material-ui.com/guides/minimizing-bundle-size/
        plugins: [
          [
            "babel-plugin-import",
            {
              libraryName: "@material-ui/core",
              // Use "'libraryDirectory': ''," if your bundler does not support ES modules
              libraryDirectory: "esm",
              camel2DashComponentName: false
            },
            "core"
          ],
          [
            "babel-plugin-import",
            {
              libraryName: "@material-ui/icons",
              // Use "'libraryDirectory': ''," if your bundler does not support ES modules
              libraryDirectory: "esm",
              camel2DashComponentName: false
            },
            "icons"
          ]
        ]
      }
    }
  },
  testEnvironment: "node",
  maxWorkers: 1,
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testPathIgnorePatterns: ["/dist/", "/node_modules/"]
};
