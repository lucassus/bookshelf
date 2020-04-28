const package = require("./package.json");

module.exports = {
  displayName: {
    color: "blue",
    name: package.name
  },
  testEnvironment: "node",
  maxWorkers: 2,
  setupFilesAfterEnv: ["./src/testUtils/setup.ts"],
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};
