module.exports = {
  extends: "../../.eslintrc.js",
  overrides: [
    {
      files: ["*.test.ts"],
      env: { jest: true },
      extends: ["plugin:jest/recommended"]
    }
  ],
  rules: {
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
  }
};
