const path = require("path");

const package = require("./package.json");

module.exports = {
  displayName: {
    color: "green",
    name: package.name
  },
  maxWorkers: 1,
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};
