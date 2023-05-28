const package = require("./package.json");

module.exports = {
  displayName: {
    color: "yellow",
    name: package.name
  },
  testEnvironment: "node",
  maxWorkers: 1,
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { isolatedModules: true }]
  }
};
