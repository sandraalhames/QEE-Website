module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx'] },
    },
  },
  rules: {
    'react/require-default-props': ['error', { functions: 'defaultArguments' }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
  },
  overrides: [
    {
      // test files and the vitest setup use dev-only deps and Vitest globals
      files: ['**/*.test.{js,jsx}', 'src/test/**'],
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
        // mock observers are test doubles: empty no-op methods and several
        // stub classes in one setup file are expected
        'class-methods-use-this': 'off',
        'max-classes-per-file': 'off',
      },
    },
  ],
};
