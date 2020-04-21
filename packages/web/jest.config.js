module.exports = {
  maxWorkers: 2,
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
};
