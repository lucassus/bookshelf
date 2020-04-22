module.exports = {
  displayName: {
    color: "green",
    name: "web"
  },
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
