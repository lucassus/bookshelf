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
    "@typescript-eslint/no-var-requires": "off",
    "global-require": "off"
  }
};
