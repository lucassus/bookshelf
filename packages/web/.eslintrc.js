module.exports = {
  extends: "../../.eslintrc.js",
  extends: ["airbnb/hooks", "prettier/react"],
  overrides: [
    {
      files: ["*.test.{ts,tsx}"],
      env: { jest: true },
      extends: ["plugin:jest/recommended", "plugin:testing-library/recommended"]
    },
    {
      files: "*.generated.tsx",
      rules: {
        "import/no-duplicates": "off"
      }
    }
  ],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.test.{ts,tsx}", "**/*.stories.tsx"] }
    ],
    "jsx-a11y/label-has-associated-control": "off",
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["draft"] }
    ],
    "react/button-has-type": "off",
    "react/prop-types": "off"
  }
};
