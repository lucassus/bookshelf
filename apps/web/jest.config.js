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
  setupFilesAfterEnv: ["./src/testUtils/setup.ts"],
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};
