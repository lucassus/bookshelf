module.exports = {
  extends: ["../../.eslintrc.js", "plugin:cypress/recommended"],
  rules: {
    "@typescript-eslint/no-namespace": "off",
    "import/no-extraneous-dependencies": "off"
  }
};
