module.exports = {
  extends: ["../../.eslintrc.js", "airbnb/hooks", "prettier/react"],
  overrides: [
    {
      files: ["src/*.test.{ts,tsx}"],
      env: { jest: true },
      extends: ["plugin:jest/recommended", "plugin:testing-library/recommended"]
    },
    {
      files: "src/*.generated.tsx",
      rules: {
        "import/no-duplicates": "off"
      }
    }
  ],
  rules: {
    "@typescript-eslint/no-use-before-define": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "src/**/*.test.{ts,tsx}",
          "src/**/*.stories.tsx",
          "src/**/stories.tsx",
          "src/testUtils/**/*.ts"
        ]
      }
    ],
    "jsx-a11y/label-has-associated-control": "off",
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["draft"] }
    ],
    "react/button-has-type": "off",
    "react/jsx-props-no-spreading": ["error", { html: "ignore" }],
    "react/prop-types": "off"
  }
};
