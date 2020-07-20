const package = require("./package.json");

module.exports = {
  displayName: {
    color: "blue",
    name: package.name
  },
  testEnvironment: "node",
  maxWorkers: 1,
  setupFilesAfterEnv: ["./src/tests/setup.ts"],
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};
