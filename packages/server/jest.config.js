module.exports = {
  maxWorkers: 2,
  testPathIgnorePatterns: [
    "/dist/",
    "/node_modules/"
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};
