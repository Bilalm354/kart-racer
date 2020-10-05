module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest',
    'sort-class-members',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-console': 'off',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'no-plusplus': 'off',
    'react/jsx-filename-extension': 'off',
    'import/no-absolute-path': 'off',
    'sort-class-members/sort-class-members': [2, {
      order: [
        '[static-properties]',
        '[static-methods]',
        '[properties]',
        '[conventional-private-properties]',
        'constructor',
        '[methods]',
        '[conventional-private-methods]',
      ],
      groups: [{ type: 'method', sort: 'alphabetical' }],
      accessorPairPositioning: 'getThenSet',
    }],
  },
};
