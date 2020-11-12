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
    "global-require": "off",
    "import/extensions": "off", // TODO: Figure out why it does not work with "~/" import prefix
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.test.ts",
          "src/infra/testing/**/*.ts",
          "src/interfaces/graphql/createTestClient.ts",
          "src/interfaces/http/createTestClient.ts"
        ]
      }
    ],
    "import/no-relative-parent-imports": "error"
  }
};
