/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'next/core-web-vitals',
    'next/typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-max-props-per-line': [
      2,
      {
        maximum: 1,
        when: 'multiline',
      },
    ],
    'prettier/prettier': ['error'],
    'arrow-body-style': ['error'],
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
