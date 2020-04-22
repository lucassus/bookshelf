module.exports = {
  name: "server",
  displayName: "server",
  maxWorkers: 2,
  testPathIgnorePatterns: [
    "/dist/",
    "/node_modules/"
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};
