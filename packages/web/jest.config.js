module.exports = {
  name: "web",
  displayName: "web",
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
