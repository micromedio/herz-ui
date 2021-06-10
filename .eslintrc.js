module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: [
    "prettier",
  ],
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  rules: {
    "unicorn/no-array-for-each": "off",
    "unicorn/prefer-node-protocol": "off",
    "unicorn/prefer-module": "off",
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
          kebabCase: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:unicorn/recommended",
        "prettier",
      ],
      rules: {
        "prettier/prettier": "error",
        "unicorn/no-array-for-each": "off",
        "unicorn/prefer-node-protocol": "off",
        "unicorn/prefer-module": "off",
        "unicorn/prefer-ternary": "off",
        "unicorn/no-nested-ternary": "off",
        "unicorn/no-null": "off",
        "unicorn/prefer-spread": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "react/self-closing-comp": ["error"],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { varsIgnorePattern: "(^jsx$)" },
        ],

        "unicorn/prevent-abbreviations": [
          "error",
          {
            replacements: {
              prop: false,
              props: false,
              ref: false,
            },
            checkFilenames: false,
          },
        ],
      },
    },
  ],
}
