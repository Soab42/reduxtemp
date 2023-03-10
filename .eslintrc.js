module.exports = {
  env: {
    es6: true,
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb-base",
    "prettier"
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "prettier", "simple-import-sort"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    // semi: ["error", "always"],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "none",
        singleQuote: false,
        printWidth: 80,
        tabWidth: 2,
        semi: true,
        parser: "flow",
        endOfLine: "auto"
      },
      {
        usePrettierrc: false
      }
    ]
  }
};
