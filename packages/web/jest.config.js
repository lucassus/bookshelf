module.exports = {
  maxWorkers: 2,
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testPathIgnorePatterns: [
    "/dist/",
    "/node_modules/"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
};
