import parseTypescript from '@typescript-eslint/parser';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import pluginReactHook from 'eslint-plugin-react-hooks';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginConfigPrettier from 'eslint-config-prettier';
import pluginUnicorn from 'eslint-plugin-unicorn';

export default [
  {
    ignores: ['lib/**/*', 'node_modules/*'],
    languageOptions: {
      parser: parseTypescript,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTypescript,
      react: pluginReact,
      pluginReactHook,
      unicorn: pluginUnicorn,
      pluginConfigPrettier,
      prettier: pluginPrettier,
    },
    rules: {
      'unicorn/no-array-for-each': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/consistent-destructuring': 'off',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
            kebabCase: true,
          },
        },
      ],
      'prettier/prettier': 'error',
      'unicorn/no-array-for-each': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/consistent-destructuring': 'off',
      'unicorn/no-useless-undefined': [
        'error',
        {
          checkArguments: false,
        },
      ],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': ['error'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '(^jsx$)' },
      ],

      'unicorn/prevent-abbreviations': [
        'error',
        {
          replacements: {
            prop: false,
            props: false,
            ref: false,
          },
          checkFilenames: false,
        },
      ],
      'unicorn/no-array-reduce': 'off',
    },
  },
];
