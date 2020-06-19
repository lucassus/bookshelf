const package = require("./package.json");

module.exports = {
  displayName: {
    color: "green",
    name: package.name
  },
  maxWorkers: 1,
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "<rootDir>/__mocks__/cssTransform.js"
  },
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};
