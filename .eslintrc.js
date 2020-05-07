module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "prettier", "react-hooks"],
  rules: {},
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    }
  ]
};
