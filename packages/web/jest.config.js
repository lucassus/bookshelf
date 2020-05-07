const package = require("./package.json");

module.exports = {
  displayName: {
    color: "green",
    name: package.name
  },
  preset: "ts-jest",
  testEnvironment: "node",
  maxWorkers: 1,
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testPathIgnorePatterns: ["/dist/", "/node_modules/"]
};
