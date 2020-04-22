module.exports = {
  displayName: {
    color: "blue",
    name: "server"
  },
  testEnvironment: "node",
  maxWorkers: 2,
  testPathIgnorePatterns: [
    "/dist/",
    "/node_modules/"
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};
